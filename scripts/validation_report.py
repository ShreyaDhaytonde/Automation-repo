from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import asdict, dataclass, field
from typing import Any

@dataclass
class Failure:
    spec: str
    title: str
    error: str
    category: str = ""
    reason: str = ""


@dataclass
class Report:
    total: int = 0
    passed: int = 0
    failed: int = 0
    skipped: int = 0
    flaky: int = 0
    pass_rate: float = 0.0
    confidence: int = 0
    verdict: str = "unknown"
    failures: list[Failure] = field(default_factory=list)
    counts_by_category: dict[str, int] = field(default_factory=dict)
    summary: str = ""
    # This generator never writes test.skip() (confirmed: no such call in the
    # generation/validation pipeline), so every "skipped" status Playwright reports is
    # a test that was never reached -- most commonly the remainder after --max-failures
    # cut a run short -- not a deliberate skip. Named for what it actually means to the
    # agent's shard-until-complete loop, not for Playwright's raw status string.
    not_executed_titles: list = field(default_factory=list)
    # Flaky means it failed at least once, then passed on Playwright's own retry --
    # a real reliability problem (usually a race: asserting before an async UI update
    # settles), but invisible to the repair loop today since it never reaches
    # `failures` (the test technically ended up passing). Recorded with the failed
    # attempt's own error text so a repair pass has real evidence to act on.
    flaky_titles: list = field(default_factory=list)


def _walk_specs(suites: list[dict], path: str = "") -> Any:
    for suite in suites or []:
        current = path or suite.get("file") or suite.get("title", "")
        for spec in suite.get("specs", []) or []:
            yield current, spec
        yield from _walk_specs(suite.get("suites", []) or [], current)


_ANSI_ESCAPE_PATTERN = re.compile(r"\x1b\[[0-9;]*m")


def _strip_ansi(text: str) -> str:
    """Playwright's error messages carry ANSI color codes meant for a real
    terminal (dimming 'locator', coloring Expected/Received, ...). Anything
    downstream that displays this as plain text -- the PR comment, a
    dashboard summary -- can't interpret them, so they'd show up as literal
    '[2m', '[31m', ... in the rendered text without this."""
    return _ANSI_ESCAPE_PATTERN.sub("", text)


def _error_text(test: dict) -> str:
    parts: list[str] = []
    for result in test.get("results", []) or []:
        for err in result.get("errors", []) or []:
            if err.get("message"):
                parts.append(str(err["message"]))
        if result.get("error", {}).get("message"):
            parts.append(str(result["error"]["message"]))
        if result.get("errors") is None and result.get("stderr"):
            parts.append("".join(str(s) for s in result["stderr"]))
    return _strip_ansi("\n".join(parts))


def build_report(results: dict) -> Report:
    report = Report()
    for spec_file, spec in _walk_specs(results.get("suites", [])):
        for test in spec.get("tests", []) or []:
            status = test.get("status") or (test.get("results") or [{}])[0].get("status")
            report.total += 1
            if status == "flaky":
                report.flaky += 1
                report.flaky_titles.append(
                    {
                        "spec": spec_file,
                        "title": spec.get("title", "<untitled>"),
                        "error": _error_text(test).strip()[:600],
                    }
                )
                continue
            if status in ("expected", "passed"):
                report.passed += 1
                continue
            if status == "skipped":
                report.skipped += 1
                report.not_executed_titles.append(
                    {"spec": spec_file, "title": spec.get("title", "<untitled>")}
                )
                continue

            report.failed += 1
            error = _error_text(test)
            report.failures.append(
                Failure(
                    spec=spec_file,
                    title=spec.get("title", "<untitled>"),
                    error=error.strip()[:600],
                )
            )

    counted = report.passed + report.failed + report.flaky
    report.pass_rate = round(report.passed / counted, 4) if counted else 0.0
    return report


def _baseline_confidence(report: Report) -> tuple[int, str]:
    """No root-cause category exists yet at this stage -- this is a coarse,
    pre-classification number so a report always carries SOME confidence
    value (the run summary and the agent's own rendering both display one).
    It only ever weighs pass/fail/flaky counts, never a category, because no
    category is known here. Once the agent classifies real failures, its own
    _score_confidence (src/agent/agent.py) recomputes this properly from the
    real categories and overwrites this placeholder."""
    if report.total == 0:
        return 0, "no tests ran"
    if report.failed == 0 and report.flaky == 0:
        return 100, "clean run"
    score = max(0, 100 - 12 * report.failed - 8 * report.flaky)
    return score, (
        f"{report.failed} failing, {report.flaky} flaky test(s) -- root cause not yet "
        "classified, pending the agent's own classification pass"
    )


def _deterministic_summary(report: Report) -> str:
    lines = [
        f"{report.passed}/{report.total} passed "
        f"({report.failed} failed, {report.flaky} flaky, {report.skipped} skipped).",
    ]
    for failure in report.failures[:5]:
        lines.append(f"- {failure.title}: {failure.error[:120]}")
    return " ".join(lines)


def _missing_results_report(exc: Exception) -> tuple[Report, str]:
    reason = (
        f"no test results ({type(exc).__name__}: {exc}) -- Playwright likely never ran "
        "because an earlier infrastructure step failed (backend health check, frontend "
        "health check, or dependency install); see this run's earlier steps for the "
        "actual cause"
    )
    report = Report(confidence=0, verdict="fail")
    report.failures.append(
        Failure(
            spec="<pipeline>",
            title="Playwright never ran",
            error=str(exc),
            # Unlike every other failure, this one is not a guess: no
            # results.json existing at all can only mean an earlier
            # infrastructure step failed before Playwright ever started, so
            # it is safe to say infra_bug here without waiting on the
            # agent's classification pass.
            category="infra_bug",
            reason=reason,
        )
    )
    report.counts_by_category["infra_bug"] = 1
    report.summary = (
        "No Playwright test results were produced this run. This is a server/environment "
        "problem, not a test-authoring issue: an earlier step (most likely the backend or "
        "frontend health check) failed and every step after it was skipped, so the "
        "generated test suite was never given the chance to run. Check the backend and "
        "frontend startup logs for this run to find the actual server bug."
    )
    return report, reason


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--results", default="results/results.json")
    parser.add_argument("--out", default="results/validation-report.json")
    args = parser.parse_args()

    try:
        with open(args.results) as handle:
            results = json.load(handle)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"::error title=Unreadable results::{exc}", file=sys.stderr)
        report, reason = _missing_results_report(exc)
        context = {
            "branch": os.environ.get("VALIDATION_BRANCH", ""),
            "commit_sha": os.environ.get("VALIDATION_COMMIT_SHA", ""),
            "source_repo": os.environ.get("VALIDATION_SOURCE_REPO", ""),
            "source_commit": os.environ.get("VALIDATION_SOURCE_COMMIT", ""),
            "run_url": os.environ.get("VALIDATION_RUN_URL", ""),
            "confidence_reason": reason,
        }
        os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
        with open(args.out, "w") as handle:
            json.dump({**context, **asdict(report)}, handle, indent=2)
        print(f"verdict={report.verdict} confidence={report.confidence} ({reason})")
        return 1

    report = build_report(results)
    report.confidence, reason = _baseline_confidence(report)
    report.verdict = "pass" if report.failed == 0 and report.flaky == 0 else "fail"
    report.summary = _deterministic_summary(report)

    context = {
        "branch": os.environ.get("VALIDATION_BRANCH", ""),
        "commit_sha": os.environ.get("VALIDATION_COMMIT_SHA", ""),
        "source_repo": os.environ.get("VALIDATION_SOURCE_REPO", ""),
        "source_commit": os.environ.get("VALIDATION_SOURCE_COMMIT", ""),
        "run_url": os.environ.get("VALIDATION_RUN_URL", ""),
        "confidence_reason": reason,
    }

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w") as handle:
        json.dump({**context, **asdict(report)}, handle, indent=2)

    print(f"verdict={report.verdict} confidence={report.confidence} ({reason})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
