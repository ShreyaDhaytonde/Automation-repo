"""Steps 17-21: classify failures, summarize, score confidence, route.

Self-contained on purpose. This runs inside the automation repository's CI,
which cannot install the generator's package, so it depends on nothing beyond
the standard library plus `openai` -- and degrades to a deterministic summary
when even that is unavailable.

Reads:
  results/results.json   Playwright JSON reporter output
Writes:
  results/validation-report.json   the full report, always
Optionally POSTs the report to VALIDATION_NOTIFY_URL when confidence clears
the threshold.

Run:
  python scripts/validation_report.py --results results/results.json
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from dataclasses import asdict, dataclass, field
from typing import Any

INFRA_SIGNALS = (
    "ECONNREFUSED",
    "ERR_CONNECTION_REFUSED",
    "ERR_CONNECTION_RESET",
    "ERR_NAME_NOT_RESOLVED",
    "ERR_EMPTY_RESPONSE",
    "ERR_ADDRESS_UNREACHABLE",
    "net::ERR_",
    "502 Bad Gateway",
    "503 Service Unavailable",
    "504 Gateway Timeout",
    "Target page, context or browser has been closed",
    "browserType.launch",
    "Executable doesn't exist",
)

TEST_SIGNALS = (
    "strict mode violation",
    "resolved to 2 elements",
    "resolved to 3 elements",
    "resolved to more than one element",
    "did not find some options",
    "Option not found",
    "is not a function",
    "Cannot find module",
    "SyntaxError",
    "ReferenceError",
    "TypeError",
)

DEVELOPER_SIGNALS = (
    "Received string",
    "Received: ",
    "expect(received)",
    "toHaveText",
    "toHaveValue",
    "toHaveURL",
    "toHaveCount",
    "toBeDisabled",
    "toBeEnabled",
    "toBeChecked",
)

OBSERVED_VALUE_MARKERS = (
    "Received",
    "Actual:",
    "Received string",
    "Received array",
    "Received number",
)

DEVELOPER_BUG = "developer_bug"
TEST_BUG = "test_bug"
INFRA_BUG = "infra_bug"


@dataclass
class Failure:
    spec: str
    title: str
    category: str
    reason: str
    error: str


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
    notified: bool = False


def classify(error: str) -> tuple[str, str]:
    """Return (category, human reason) for one failure's error text.

    Order matters and is deliberate. Infrastructure is checked first because
    when the app or backend is unreachable EVERY other signal is noise -- a
    locator "not found" on a page that never loaded says nothing about the
    locator. Test-authoring faults come next since they are textually
    distinctive.

    An assertion mismatch is only credible once the element was actually
    found and read. Playwright prints the matcher name in its timeout text
    too ("Timed out 5000ms waiting for expect(locator).toBeDisabled()"), so
    matching on the matcher name alone reports a locator that never resolved
    as an application bug -- and sends a developer looking for a defect that
    the run never observed. A real mismatch carries the value that was read
    back, so that is what decides it.
    """
    haystack = error or ""

    for signal in INFRA_SIGNALS:
        if signal in haystack:
            return INFRA_BUG, f"environment problem: matched {signal!r}"

    for signal in TEST_SIGNALS:
        if signal in haystack:
            return TEST_BUG, f"test authoring problem: matched {signal!r}"

    observed_a_value = any(marker in haystack for marker in OBSERVED_VALUE_MARKERS)
    if observed_a_value:
        for signal in DEVELOPER_SIGNALS:
            if signal in haystack:
                return DEVELOPER_BUG, f"application behaved differently: matched {signal!r}"

    lowered = haystack.lower()
    if "timeout" in lowered or "timed out" in lowered:
        return TEST_BUG, "timed out waiting for a locator - selector or missing feature"

    for signal in DEVELOPER_SIGNALS:
        if signal in haystack:
            return DEVELOPER_BUG, f"application behaved differently: matched {signal!r}"

    return TEST_BUG, "unrecognized failure - triage manually"


def _walk_specs(suites: list[dict], path: str = "") -> Any:
    """Yield (spec_file, spec) pairs from Playwright's nested suite tree."""
    for suite in suites or []:
        current = path or suite.get("file") or suite.get("title", "")
        for spec in suite.get("specs", []) or []:
            yield current, spec
        yield from _walk_specs(suite.get("suites", []) or [], current)


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
    return "\n".join(parts)


def build_report(results: dict) -> Report:
    report = Report()
    for spec_file, spec in _walk_specs(results.get("suites", [])):
        for test in spec.get("tests", []) or []:
            status = test.get("status") or (test.get("results") or [{}])[0].get("status")
            report.total += 1
            if status == "flaky":
                report.flaky += 1
                continue
            if status in ("expected", "passed"):
                report.passed += 1
                continue
            if status == "skipped":
                report.skipped += 1
                continue

            report.failed += 1
            error = _error_text(test)
            category, reason = classify(error)
            report.failures.append(
                Failure(
                    spec=spec_file,
                    title=spec.get("title", "<untitled>"),
                    category=category,
                    reason=reason,
                    error=error.strip()[:600],
                )
            )

    counted = report.passed + report.failed + report.flaky
    report.pass_rate = round(report.passed / counted, 4) if counted else 0.0
    for failure in report.failures:
        report.counts_by_category[failure.category] = (
            report.counts_by_category.get(failure.category, 0) + 1
        )
    return report


def score_confidence(report: Report) -> tuple[int, str]:
    """How much this run's verdict can be trusted, and why.

    This scores the RUN, not the application. The distinction matters: a
    developer bug is a successful validation -- the suite did its job and
    found something -- so it must not reduce confidence. What destroys
    confidence is not knowing whether anything was really tested.

    - infra failures: the app or backend was unreachable, so the suite
      proved nothing. Heaviest penalty, and any infra failure caps the
      score below the notify threshold outright.
    - test bugs: the suite is faulty, so its passes are also suspect.
    - flaky: passed only on retry, so its verdict is unstable.
    - developer bugs: real findings. No penalty.
    """
    infra = report.counts_by_category.get(INFRA_BUG, 0)
    test_bugs = report.counts_by_category.get(TEST_BUG, 0)
    developer = report.counts_by_category.get(DEVELOPER_BUG, 0)

    if report.total == 0:
        return 0, "no tests ran"

    score = 100
    notes: list[str] = []

    if infra:
        score -= 40 + 5 * infra
        notes.append(f"{infra} infrastructure failure(s) - the app under test was unreachable")
    if test_bugs:
        score -= 12 * test_bugs
        notes.append(f"{test_bugs} test-authoring failure(s) - suite correctness is in doubt")
    if report.flaky:
        score -= 8 * report.flaky
        notes.append(f"{report.flaky} flaky test(s) - verdict unstable across retries")
    if developer:
        notes.append(f"{developer} application failure(s) - real findings, confidence unaffected")

    score = max(0, min(100, score))
    if infra:
        score = min(score, 55)

    return score, "; ".join(notes) or "clean run"


def _deterministic_summary(report: Report) -> str:
    lines = [
        f"{report.passed}/{report.total} passed "
        f"({report.failed} failed, {report.flaky} flaky, {report.skipped} skipped).",
    ]
    for category, count in sorted(report.counts_by_category.items()):
        lines.append(f"{count} x {category.replace('_', ' ')}")
    for failure in report.failures[:5]:
        lines.append(f"- [{failure.category}] {failure.title}: {failure.reason}")
    return " ".join(lines)


def ai_summary(report: Report) -> str:
    """One paragraph a reviewer can act on, or a deterministic fallback.

    The fallback is not a degraded mode to apologise for: a report that
    always renders is worth more than one that is occasionally richer, and
    the counts plus categories already carry the actionable content.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    model = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini")
    if not api_key or not report.failures:
        return _deterministic_summary(report)

    try:
        from openai import OpenAI
    except ImportError:
        return _deterministic_summary(report)

    payload = {
        "totals": {
            "total": report.total,
            "passed": report.passed,
            "failed": report.failed,
            "flaky": report.flaky,
        },
        "failures": [asdict(f) for f in report.failures[:15]],
    }
    try:
        client = OpenAI(api_key=api_key)
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You summarize a Playwright validation run for a reviewer who has "
                        "not seen it. Two short paragraphs, plain prose, no markdown. Say "
                        "what failed and what the most likely cause is, grouping failures "
                        "that share a cause. Distinguish clearly between the application "
                        "misbehaving, the generated test being wrong, and the environment "
                        "being broken. State only what the data supports; if a cause is "
                        "ambiguous, say so rather than guessing."
                    ),
                },
                {"role": "user", "content": json.dumps(payload)},
            ],
        )
        text = (completion.choices[0].message.content or "").strip()
        return text or _deterministic_summary(report)
    except Exception as exc:  # noqa: BLE001 - never fail the pipeline on summary
        return f"{_deterministic_summary(report)} (AI summary unavailable: {type(exc).__name__})"


def notify(report: Report, context: dict[str, str]) -> bool:
    """POST the report to the configured tool. Returns whether it was sent.

    Deliberately a plain HTTP POST to one URL rather than an integration with
    any particular product: whatever receives it -- an existing internal
    tool, a Teams incoming webhook, a queue -- only needs to accept JSON.
    """
    url = os.environ.get("VALIDATION_NOTIFY_URL")
    if not url:
        return False

    body = json.dumps({**context, **asdict(report)}).encode()
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    token = os.environ.get("VALIDATION_NOTIFY_TOKEN")
    if token:
        request.add_header("Authorization", f"Bearer {token}")

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return 200 <= response.status < 300
    except (urllib.error.URLError, OSError) as exc:
        print(f"::warning title=Notification failed::{exc}", file=sys.stderr)
        return False


def _missing_results_report(exc: Exception) -> tuple[Report, str]:
    """Build the report for a run where Playwright never produced results.json.

    This is not a test-authoring failure -- there is no suite to blame, since
    no test ever ran. The overwhelmingly common cause is an earlier
    infrastructure step (backend/frontend health check) failing and skipping
    every step after it, so this is reported as a server/environment problem,
    never as test_bug.
    """
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
            category=INFRA_BUG,
            reason=reason,
            error=str(exc),
        )
    )
    report.counts_by_category[INFRA_BUG] = 1
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
    parser.add_argument("--threshold", type=int, default=80)
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
        print(f"categories={report.counts_by_category}")
        return 1

    report = build_report(results)
    report.confidence, reason = score_confidence(report)
    report.verdict = "pass" if report.failed == 0 and report.flaky == 0 else "fail"
    report.summary = ai_summary(report)

    context = {
        "branch": os.environ.get("VALIDATION_BRANCH", ""),
        "commit_sha": os.environ.get("VALIDATION_COMMIT_SHA", ""),
        "source_repo": os.environ.get("VALIDATION_SOURCE_REPO", ""),
        "source_commit": os.environ.get("VALIDATION_SOURCE_COMMIT", ""),
        "run_url": os.environ.get("VALIDATION_RUN_URL", ""),
        "confidence_reason": reason,
    }

    if report.confidence >= args.threshold:
        report.notified = notify(report, context)

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    with open(args.out, "w") as handle:
        json.dump({**context, **asdict(report)}, handle, indent=2)

    print(f"verdict={report.verdict} confidence={report.confidence} ({reason})")
    print(f"categories={report.counts_by_category}")
    print(f"notified={report.notified}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
