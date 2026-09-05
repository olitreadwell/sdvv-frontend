# opensandiego/sdvv-frontend context
> refreshed 2026-09-05 | upstream default: main @ 6f2d4f0

## Identity & policies
- upstream: opensandiego/sdvv-frontend, default branch main, primary language TypeScript (Angular 21), English-first (yes — issues/docs/UI all English)
- CLA/DCO: none (CONTRIBUTING.md is minimal, no CLA/DCO/signup ask)
- AI-assisted PR policy: unstated (no AI policy in repo; no org opensandiego/.github)
- signed commits required: no
- PR template: none (no .github/PULL_REQUEST_TEMPLATE.md; no org default)
- external tracker: github

## Conventions (verified from merged PRs)
- branch naming: type/desc (fix/echart-import, chore/update-echarts, chore/update-dependencies); release branches release/dev, release/prod
- release flow: feature -> dev (deleted) -> release/dev -> release/prod -> main
- test command: ng test (karma, needs Chrome); lint: ng lint (currently 52 pre-existing prefer-inject/prefer-standalone errors on main); build: npm run build (passes)
- CI checks: build_on_pull_request.yml + e2e_tests.yml both trigger on `branches: [dev]` — a branch that no longer exists (default is main), so no PR to main ever runs the build check

## Maintainer picture
- small civic-tech team; robertgz is the active project manager (assignee on open issues)
- recent merged PRs are release merges (release/prod -> main, release/dev -> release/prod); no recent external contributor merges

## Issue-area health
- open issues #513-518 are all `status: quote pending` — feature requests being quoted by a vendor (robertgz), not actionable for us
- #366-368 are stale 2022 enhancements, no maintainer engagement
- no maintainer-engaged open issue survives the filters

## Gap ledger (dedupe — READ FIRST, never re-pick)
- `2026-09-05` self-found CI gap — outcome: pr-opened (fork PR #3) — build_on_pull_request.yml triggered on deleted `dev` branch, so PRs to main never got a build check; fixed trigger to main; fork build check green

## Mined gaps (discovered, not yet attempted)
- `2026-09-05` tests/CI: build_on_pull_request.yml triggers on `branches: [dev]` (deleted); default is main, dependabot PRs target main, so no PR build check runs. Repro: read workflow + branch list. Expected: build check runs on PRs to main. Proposed fix: change trigger to main. Dedupe: no upstream issue/PR addresses CI trigger branch. — status: attempted (pr-opened, fork PR #3)
- `2026-09-05` a11y: header hamburger is `<i (click)>` with no keyboard handler/role — not caught by repo lint (template/recommended lacks click-events rule), so not verifiable with repo tooling. — status: dropped (not lint-verifiable)
