# Current project checkpoint

Updated: 2026-09-29. M0 T1 implementation and social-source tooling review are
complete in the working tree. No merge to `main` or deployment was performed.

## Resume first

- Repository: `/Users/weizhihao/workspace/project/skiing/ski-trail-atlas`.
- Branch: `codex/fulong-trace-pilot`.
- Entry HEAD: `d8d9868dd3f68e15e06e6806ddadf861a664de87`.
- T1 implementation commit: `3c68b6d` (`feat: add Chongli portal entry for Fulong (#3)`).
- Local `main`: `5908c52f180817d712d56542cb2ba148edcc4fb1`, unchanged.
- Working tree: dirty; preserve the source/test WIP listed below and the new
  documentation changes. HEAD alone does not contain this checkpoint.
- Active milestone: **M0 — Chongli portal**. T1 is implemented and verified;
  T2 and T3 are the next dependency-unblocked product slices after T1 closes.
- Scope: [approved M0–M5 sequence](../MILESTONES.md).
- Published spec/tasks: [M0 portal](../specs/m0-chongli-portal.md), parent
  [#2](https://github.com/Zachary-wW/ski-trail-atlas/issues/2), tasks
  [#3](https://github.com/Zachary-wW/ski-trail-atlas/issues/3),
  [#4](https://github.com/Zachary-wW/ski-trail-atlas/issues/4),
  [#5](https://github.com/Zachary-wW/ski-trail-atlas/issues/5), and
  [#6](https://github.com/Zachary-wW/ski-trail-atlas/issues/6).
- Setup: [issue tracker](issue-tracker.md) and [triage labels](triage-labels.md).

## Decisions and completed documentation work

Chongli is the initial product region. Fulong is the first deep template;
the portal precedes completing its map, videos, routing and later daily feeds.
The old “M0 structural baseline done / M1 publication contract active” sequence
is retired. The structural reference is partial M1 evidence, not a finished atlas.

- The milestone index now has user-visible exit gates and an interruption loop.
- Developer Markdown is English; proper names and verbatim source/UI quotations
  remain. Application language and raw evidence are unchanged.
- The duplicate Chinese README and old roadmap were consolidated. The old
  rebuild plan became the [Fulong acceptance contract](../fulong-atlas-acceptance.md).
- ADRs, source identities, calibration and chronological correction history
  remain. The outer workspace's older documents were not modified.
- The setup skill's proposed GitHub tracker files and default triage labels
  were approved on 2026-09-29 and activated. No project board was created.
- `to-spec` and `to-tickets` produced the approved M0 parent spec and four
  executable Issues listed in the spec.

## T1 implementation, not milestone completion

Development and production roots now render a minimal Chongli portal. Its
Fulong card reports an unavailable opening outlook, opens the existing
structural map at `/resorts/fulong/map`, and the map brand returns to the portal.
The two prototype aliases remain available. GitHub Pages 404 recovery restores
the stable resort path, while unknown resort paths render Not Found instead of
Fulong. Legacy trail URLs still use the older publication/map surface.

The structural candidate has 65 visual segments, 35 trail-code groups,
3 reference features and 9 transports; 51 segments are excluded from candidate
routing. Full trail facts, difficulty colors, facilities and videos are not
complete. No sourced opening countdown or second-resort overview exists yet.
No deployment or live-site inspection was performed in this pass.

The tooling review is in
[social-source-tooling.md](../research/social-source-tooling.md). It recommends
manual M0 evidence research, OpenCLI only for a supervised discovery spike,
and an isolated We-MP-RSS evaluation for M4. No collector was installed and no
account, cookie or social-platform content was accessed.

The [baseline](../baselines/fulong-structural-2026-09-28.md) names HEAD as a
reference revision. It is not a Git tag, immutable copy of dirty work, or
complete M1 acceptance.

## Preserved source/test WIP

These changes predate the current documentation pass:

- `src/content/compile-publication.ts`: schema 2 support, multiple identified
  Trail Locations, explicit route segments and missing field states.
- `src/routing/plan-trail-route.ts`: schema 2 explicit trail edges, legacy
  fallback and separate trail/edge identity.
- `src/App.tsx`, `src/PanoramaMap.tsx`, `src/i18n.ts`: partial support for missing
  fields and route highlighting.
- `tests/content/compile-publication.test.ts`,
  `tests/content/route-planner.test.ts`: tests for the partial contract changes.

This WIP is not reviewed production-routing eligibility. Real publication data
still uses schema 1; the five-trail migration and Video Match integration are
unfinished. Review gates still need attention: multi-edge trail endpoints can
return no route, transport edges remain automatically assembled, explicit
route segments can carry unverified state, and metrics may render missing
values incorrectly. These are carry-forward risks, not fixes made this turn.

The diff over the seven listed WIP files remains
`7994164be66c1434096ea084e9d854d6303afc89e06c517309779126e890f0ea`.
The matching result confirms T1 preserved those diffs. Never reset these files
to make a feature commit clean.

## Validation provenance

- Historical geometry checks and their timing are in the trace review.
- `npm run typecheck` passed on 2026-09-29.
- `npm run test:content` passed: 6 files, 53 tests.
- `npm run test:e2e` passed: 33 browser tests.
- `npm run test:pages` passed: 5 built-Pages browser tests; the command also
  completed the production build.
- The built asset tree did not contain
  `dist/artifacts/reference/fulong-highres.webp`; production requests for the
  private WEBP/reference endpoint remained empty in the Pages test.
- A local desktop visual inspection confirmed the portal hierarchy and single
  Fulong entrance. Automated Pages coverage exercises 390 px layout, keyboard
  entry, map keyboard controls and horizontal-overflow checks.
- Documentation checks on 2026-09-29: all 28 repository Markdown files scanned;
  44 relative Markdown links resolved with zero missing targets; `git diff
  --check` passed. External links were not fetched or validated.
- The two-axis review against Issue #3 found no implementation defect. Its
  missing reload/back/forward regression and one stale “proposed” heading were
  corrected before the final Pages run. A suggested metadata helper remains a
  low-priority judgement call; T1 keeps the page-local effects.
- The remaining Chinese Markdown text consists only of five historical UI
  quotation lines with English explanations in the trace review. Old milestone
  numbering/retired filenames remain only in explicit migration/history notes.
- The preserved WIP hash, branch HEAD and local `main` revision match their
  entry values. `git diff --check` passed before this checkpoint update.

## Pending decisions and research

M0 scope, test seams/date policy and T1–T4 granularity/blockers are approved.
Future changes to those records should be made through the linked GitHub issues.

The complete Chongli roster, last-season opening dates and current-season
notices have not been verified for M0. Tooling feasibility is documented, but
no source evidence has been collected. Do not invent dates or mark opening-date
research complete.

## Next action and resume condition

The next action is to review/close Issue #3 against the candidate commit, then
choose either T2 (opening outlook data/clock) or T3 (second-resort isolation),
which can proceed independently once T1 is closed. T4 remains blocked on both.
Keep the preserved routing/publication WIP out of T1 commits.

For a bug interruption, follow the loop in the milestone index and the
[checkpoint template](handoff-template.md). A portable `handoff` artifact is
optional for an actual transfer and belongs in the OS temporary directory.
