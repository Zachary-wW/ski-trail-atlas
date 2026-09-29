# Chongli delivery milestones

Updated: 2026-09-29. Product sequence approved; M0 specification and tickets
published after user review. This replaces the former engineering-led M0–M6
sequence.

The product serves Chongli first. Fulong is the first deep Resort Package,
not the product's geographic boundary. Other regions follow only after Chongli.
This file owns milestone outcomes and gates; GitHub Issues will own executable
task status after their publication is approved.

## Delivery index

| ID | User-visible outcome | Current state | Exit gate |
| --- | --- | --- | --- |
| M0 | Chongli portal and opening outlook | T1 portal slice implemented; T2–T4 remain | Resort directory, separate sourced opening outlooks/countdowns, working resort entrances and production deep links |
| M1 | Complete Fulong atlas | Partial structural foundation, not accepted as complete | Source-faithful map, full information/feature inventory, difficulty legend and sector-by-sector visual acceptance |
| M2 | Fulong video guide and refined interaction | Planned | Every trail has a reviewed video-match state; coherent map/search/detail/video/share flow; second-resort contract probe passes |
| M3 | Reviewed Fulong route planning | Planned; candidate demonstrations exist | Declared coverage, reviewed directed trail/transport edges, exact segment highlights and fail-closed behavior |
| M4 | Chongli daily intelligence | Planned | Repeatable daily discovery, deduplication, human review and publication with visible source, age, failure and retraction states |
| M5 | Chongli-wide deep coverage | Planned | A second complete resort validates the template; remaining resorts accepted in explicit coverage batches |

“Planned” is not implementation authorization. Detail the current milestone
and the next necessary slice, not every future backend or collection system.
No milestone is complete solely because a document, schema, or prototype exists.

## M0 — Chongli portal and opening outlook

Visitors land on Chongli, see each resort's season-specific opening outlook,
understand its evidence and uncertainty, and enter the available resort surface.
Directory coverage and deep map coverage are deliberately different.

Exit criteria:

- The reviewed Chongli resort roster appears at the public root. An unresolved
  date does not remove a resort from the directory.
- Each resort shows its own announced, estimated or unavailable date state,
  applicable season, evidence and update/review information.
- Historical dates support an explicitly explained estimate, never an implied
  current-season announcement. Countdown expiry does not establish live opening.
- Fulong's structural map has a stable entrance; other resorts state which
  capabilities are unavailable instead of opening Fulong data.
- Production-base URLs, refresh, back navigation, legacy trail links and
  unknown-resort routes work. Keyboard and mobile access are covered.
- A source reviewer accepts the roster/date evidence, and a release review
  records validation, promotion and rollback evidence.

Primary source: [M0 specification](specs/m0-chongli-portal.md). Executable work:
[GitHub M0 issue](https://github.com/Zachary-wW/ski-trail-atlas/issues/2)
and its linked tasks. The test seams and date behavior were approved on
2026-09-29; implementation is still not started.

## M1 — Complete Fulong atlas

“1:1” means source-faithful relative layout and complete information, not
survey-grade coordinates, GPS navigation, or reuse rights for source artwork.
The [Fulong acceptance contract](fulong-atlas-acceptance.md) owns the map gate.

Exit criteria:

- Every reference trail, label, lift/carpet, station and key facility is
  accounted for, including explicit unresolved identities and locations.
- Relative curves, forks, merges and the accepted building gap remain faithful
  to the reviewed source; authorized deviations retain their rationale.
- Difficulty is distinguished with evidence-backed color plus text/legend;
  unknown/conflicting difficulty is explicit. Review annotation colors are not
  automatically difficulty evidence.
- Search, selection and basic trail/transport/facility information work.
- The user accepts each sector against the source. Automated regressions
  supplement this review and do not substitute for it.

The [2026-09-28 structural baseline](baselines/fulong-structural-2026-09-28.md)
is an input to M1, not proof of M0 or M1 completion.

## M2 — Fulong video guide and refined interaction

Start with B10/B11/B12/B13/B15, then cover the full reviewed Fulong catalog.

Exit criteria:

- Every trail has a trail-specific, zone-level, resort-level or missing video
  state; missing means no supported match, not a fabricated recommendation.
- Published matches retain provenance, review notes and permitted-use state.
- Search, map selection, details, video evidence and share links resolve to the
  same stable trail identity. Missing and conflicting facts remain visible.
- Desktop, mobile and keyboard flows receive interaction refinement without
  sacrificing the usability gates already required in M0/M1.
- Before M2 closes, a small second-resort data slice exercises the shared
  identity/content contract without copied Fulong business logic. This is not
  a requirement to complete a second full map at this stage.

## M3 — Reviewed Fulong routing

Exit criteria:

- Publish reviewed directed trail and typed Uphill Transport edges only.
- Trail, Transport Station and Place endpoints retain their documented
  semantics; route output names every step and highlights its exact geometry.
- Unsupported/reverse connections and unknown endpoints fail closed.
- A documented supported endpoint/coverage set is accepted with representative
  end-to-end journeys; one demonstration alone does not prove resort coverage.
- Candidate geometry, incomplete coverage and non-navigation limitations are
  visible. A Route Plan does not assert live operations, safety or travel time.

## M4 — Chongli daily intelligence

Exit criteria:

- Daily Collection Runs discover candidates, deduplicate them and leave
  diagnostics; publication requires human editorial review.
- Start official-first with manually supplied social links where necessary.
  Access/tool feasibility is researched separately; automation is not presumed.
- Resort Feeds retain resort, season, source and publication/observation dates.
- Reviewers can handle conflicts, stale items and retractions, and recover a
  prior publication. A collection failure does not erase the last valid feed.
- Run failures and freshness gaps are visible to the operator and reflected
  honestly in user-visible freshness information.

See [content ingestion](content-ingestion.md). This milestone does not commit
to a crawler, database, scheduler vendor, or automatic social-content publication.

## M5 — Chongli deep coverage

Exit criteria:

- Complete and accept a second resort through reusable data/contracts.
- Add the remaining reviewed Chongli roster in bounded batches.
- For every resort, accept map, video, routing and feed coverage separately;
  a directory card does not mean the deep package is complete.
- Shared regression and source-review gates work across resorts. Record any
  remaining gaps explicitly rather than claiming full Chongli coverage.

## Quality and capability coverage

Every milestone requires usable desktop/mobile/keyboard behavior, source and
rights review, relevant automated checks, and an explicit release decision.
M2 refines UX; it is not the first accessibility milestone.

Maintain a per-resort capability checklist in the relevant delivery issues:
directory/opening outlook, map, trail details, videos, routing and feed. Record
coverage and evidence separately from software capability maturity. No detailed
coverage tracker is created here before the resort roster is reviewed.

## Delivery and interruption loop

1. Read the [current checkpoint](agents/codex-handoff.md), milestone and approved
   spec/issue. Inspect the branch and dirty diff before touching overlapping work.
2. Use `to-spec` to settle observable behavior and confirm the highest useful
   test seam; use `to-tickets` for small end-to-end slices with real blockers.
3. After user approval, publish specs/tasks to GitHub. Work an unblocked ticket
   on a `codex/` feature branch. Do not treat `ready-for-agent` as unblocked.
4. Use `implement`/`tdd` and `code-review` for the approved scope. Record actual
   commands and results; protect unrelated WIP. Merge/deployment require their
   own authorization; writing docs does not change `main`.
5. If a bug interrupts work, record the paused issue, failing behavior,
   reproduction and affected files in the checkpoint. Preserve the dirty tree.
   Diagnose before proposing a fix; a materially broader repair requires scope
   approval. Link the eventual bug issue rather than duplicating task status.
6. Resume only after recording the repair's regression evidence and any impact
   on the paused ticket. An unrelated bug need not block the milestone.
7. At a meaningful boundary, update the checkpoint using the
   [handoff template](agents/handoff-template.md). Use the `handoff` skill for a
   portable transfer to another person/environment; its temporary artifact
   links back to durable records rather than becoming another source of truth.

## Retired numbering and document consolidation

The former M0 structural baseline is now M1 evidence. Former M1 publication
contract work is uncommitted supporting WIP, not the active product milestone.
Former M2/M4 detail/interaction work maps to M1–M2; former M3 routing maps to M3;
former M5 editorial work maps to M4; former M6 expansion maps to M5. Release
quality applies throughout.

On 2026-09-29, this index absorbed `mvp-roadmap.md`; its unique map constraints
and migration priorities remain in the Fulong acceptance contract and baseline.
`mvp-rebuild.md` was renamed/reworked into that acceptance contract.
The duplicate Chinese README was consolidated into the English README.
Research, ADRs, calibration and chronological correction evidence were retained.
Files outside this Git repository were not modified.
