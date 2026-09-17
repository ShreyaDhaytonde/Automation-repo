# Automation repo setup

Copy these four files into your automation repository, on its **default
branch**:

```
package.json
playwright.config.ts
scripts/validation_report.py
.github/workflows/playwright-validation.yml
```

`package.json` declares Playwright and the Allure reporter so `npx playwright
test` resolves them. Without it the workflow installs them unsaved on every
run, which works but reinstalls from scratch each time and pins nothing.

They must live on the default branch because generated branches are cut from
it — that is what makes the workflow present on every `playwright-agent/*`
branch without any extra step.

## Why both files

`playwright.config.ts` supplies `baseURL`. Generated specs navigate with
relative paths (`page.goto('/habits/new')`) because the route comes from the
application's source while the host depends on where the app is running.
Without a `baseURL`, every test fails on its first line.

The workflow supplies everything else: two pinned checkouts, a dev server, a
backend reachability probe, and the report.

## Job structure

The workflow is three sequential jobs, each on its own runner:

1. **prepare** — checks out the app/backend/tests, installs everything, and
   downloads the Playwright browser binary once. Packs the whole workspace
   (backend deps go into a workspace-relative `backend/.venv` specifically
   so they survive this handoff) into a short-lived artifact.
2. **validate** — restores that artifact, installs only the OS-level
   packages the browser needs (`playwright install-deps`; the binary itself
   already came in with the artifact), starts the backend/frontend, and
   runs the suite.
3. **report** — merges the results, generates the Allure report, runs
   `validation_report.py`, and uploads the final `validation-<branch>`
   artifact (the one this system's agent reads back).

Splitting it this way means a failed `report` step (say, a flaky Allure
generation) can be re-run on its own from the Actions UI without re-booting
the backend/frontend and re-running the whole suite again.

## Required secret

| Secret | When needed |
|---|---|
| `FRONTEND_URL` | Your deployed frontend, e.g. `https://your-app.vercel.app`. When set, the workflow skips checking out, installing and starting the frontend on the runner entirely and points tests straight at this URL. Unset means it checks out `source_repo`, runs its dev server on the runner, and tests `http://localhost:<frontend_port>`. |
| `BACKEND_URL` | Your deployed backend, e.g. `https://api.example.com`. Unset means `http://localhost:<backend_port>`, which only works if `backend_repo` starts one on the runner. |
| `FRONTEND_REPO_TOKEN` | **Only if the frontend repo is private.** Actions' built-in `GITHUB_TOKEN` is scoped to the repository running the workflow, so checking out a *different* private repo with it returns 404. A public repo needs no token at all — the workflow's `secrets.FRONTEND_REPO_TOKEN \|\| github.token` fallback already covers that case, so leave the secret unset. |
| `TEST_USERNAME` / `TEST_PASSWORD` | Forwarded to the test run as plain env vars, for a generated spec that reads `process.env.TEST_USERNAME`/`TEST_PASSWORD` itself. No generator logic reads or reacts to these -- see "Adding authentication later" below. |

Optional repository variable:

| Variable | Default | Purpose |
|---|---|---|
| `BACKEND_HEALTH_PATH` | `/` | Path the reachability probe hits, e.g. `/health`. |

## Ports

- frontend `npm run dev` → **3000**
- backend → **8000** (or whatever `BACKEND_URL` points at)

## What the workflow does

| Step | Action |
|---|---|
| 6 | Checkout automation repo at `commit_sha` (tests) **and** frontend repo at `source_commit` (app) |
| 7 | Node 20 |
| 8 | Install frontend deps (`npm ci`, falling back to `npm install`) |
| 10 | Install Playwright + Chromium |
| 12 | Backend reachability probe — fails fast so an outage is reported as infrastructure, not as dozens of assertion failures |
| 13 | `npm run dev` on 3000, backgrounded |
| 14 | Wait for a real HTTP answer, then warm the app so the first test does not absorb the dev server's initial compile |
| 15 | Auth — no-op until the app needs a login |
| 16 | Run the generated suite with `baseURL` pointed at the dev server |
| 17 | Parse `results.json` into pass/fail/skip/flaky counts |
| 18 | Allure report |

Steps 9 and 11 (install/start backend) are deliberately absent: the backend is
deployed and reached over the network.

A failing suite does **not** fail the run — that is the signal this pipeline
exists to surface. Artifacts (`results/`, Allure report, dev server log) are
uploaded either way, and the step summary carries the counts.

## Allure report hosting

The `report` job's "Publish Allure report to Pages" step pushes each run's
`results/allure-report` to the `gh-pages` branch, under its own
`<branch>/<run_id>/` path — a run's report never gets overwritten by a later
run, and a link to it stays valid. Requires:

- **GitHub Pages enabled on this repo**, serving from the `gh-pages` branch
  (root). One-time repo setting: Settings → Pages → Build and deployment →
  Branch → `gh-pages` / `(root)`. The workflow creates/pushes to that branch
  itself; it does not create the Pages site.
- The `report` job's `permissions: contents: write` (already in the
  workflow) — needed to push to `gh-pages` with the default `GITHUB_TOKEN`.

The resulting URL — `https://<owner>.github.io/<repo>/<branch>/<run_id>/` —
is what `_allure_report_url()` in `src/agent/agent.py` computes and puts in
repair commit messages. That function's path shape must stay in sync with
this step's `destination_dir` if either one changes. If the repo is public,
this URL is publicly reachable without login; keep that in mind if the app
under test or its data shouldn't be visible to anyone with the link.

## Adding authentication later

Add a Playwright setup project that signs in once and writes
`storageState`, then set `PLAYWRIGHT_STORAGE_STATE` in step 15. Credentials
belong in secrets — never in a generated spec, and the generator is
explicitly instructed never to invent them.


## Step 19: analysis

`scripts/validation_report.py` reads Playwright's JSON report and turns it
into `results/validation-report.json` — pass/fail/flaky/skipped counts, each
failure's title, spec and error text, a pass rate, and a verdict. It does
**not** decide *why* a test failed: no keyword/signal list lives here.
Root-cause classification (`infra_bug` / `test_bug` / `developer_bug`) needs
the actual test source, the real application source, and the failure's full
context to get right — a fixed list of strings can only ever be a guess, and
a wrong one silently mislabels a real application bug as a test to "fix", or
a real test bug as something to leave alone. So it happens later: the GitBook
agent fetches this raw report, hands every failure (with its test source and
the relevant application source) to an LLM in one batched call per run, and
that classification is what the repair loop and the final PR report actually
act on. See `_classify_validation_report` in `src/agent/agent.py`.

### Confidence

This script still writes a `confidence` number, but it is a coarse
placeholder — pass/fail/flaky counts only, no category, because no category
exists yet at this stage:

- clean run (no failures, no flaky) — 100.
- otherwise — a moderate penalty per failed and per flaky test.
- no tests at all — 0, never a clean pass.

Once the agent classifies real failures it recomputes confidence properly
(same shape of scoring, now category-aware: `infra_bug` capped low,
`test_bug` penalized, `developer_bug` not penalized) and that recomputed
number is what ends up in the PR report — this script's number is only ever
seen in the run's own step summary before that happens.

`results/validation-report.json` is always written and the job exits 0 — a
failing suite is this pipeline's product, not its error.


## Getting the report into Teams

The workflow uploads `results/validation-report.json` inside the
`validation-<branch>` artifact. The GitBook agent waits for the run, reads
that file, and folds the results into the same Teams message as the
generation summary — one command, one message:

```bash
aetherion agent GitBook '{
  "repo_url": "https://github.com/ShreyaDhaytonde/habit-tracker-client",
  "automation_repo_url": "https://github.com/ShreyaDhaytonde/Automation-repo",
  "teams_recipient": "shreya.dhaytonde@calfus.com"
}'
```

The agent pulls the artifact rather than being pushed to, deliberately: CI
cannot reach a Temporal cluster running on a laptop, but GitHub will hold the
file until the agent asks for it. No tunnel, no public endpoint, no
self-hosted runner.

A report below `notify_threshold` (default 80) is **withheld** rather than
sent — a low score almost always means an unreachable environment, so the
verdict proved nothing, and messaging it anyway trains people to ignore the
channel. Add `"wait_for_validation": false` to return as soon as the branch is
pushed.
