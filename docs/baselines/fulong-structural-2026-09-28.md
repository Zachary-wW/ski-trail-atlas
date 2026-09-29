# Fulong structural baseline — 2026-09-28

- Baseline ID: `fulong-structural-2026-09-28`
- Git revision: `d8d9868dd3f68e15e06e6806ddadf861a664de87`
- Review record: [Fulong trace pilot review](../trace-pilot-review.md)

This document names a reference revision of the user-reviewed structural
candidate. No Git tag was created; it does not freeze the current dirty tree
or certify completion of any milestone. Under the revised
[M0–M5 sequence](../MILESTONES.md), it is partial M1 evidence.
The revision contains 65 visual segments, 35 trail-code groups, three
reference-only features and nine uphill-transport records. Fifty-one visual
segments remain excluded from directed routing.

The baseline records identity and provenance, not live operating status,
survey-grade geometry, difficulty, or travel direction. A later geometry change
must cite new source evidence and add a focused regression. The local high-resolution
reference raster remains outside published assets.

## First content-slice migration

Each prototype segment below becomes a separately identifiable `TrailLocation`.
Its drawing order does not establish travel direction. A location participates in
route planning only when a separate reviewed `RouteSegment` references it.

| Trail | Prototype segment | From node | To node | Initial routing state |
| --- | --- | --- | --- | --- |
| B10 | `b10-1` | `ridge` | `central` | direction pending |
| B11 | `b11-loop-entry` | `central` | `b15End` | direction pending |
| B11 | `b11-loop-middle` | `b15End` | `b13End` | direction pending |
| B11 | `b11-loop-exit` | `b13End` | `b11Upper` | direction pending |
| B11 | `b11-upper` | `b11Upper` | `b12End` | direction pending |
| B12 | `b12-entry` | `central` | `b12Top` | direction pending |
| B12 | `b12-main` | `b12Top` | `b12End` | direction pending |
| B12 | `b12-lower` | `b12End` | `westLower` | direction pending |
| B13 | `b13-main` | `b15Fork` | `b13End` | direction pending |
| B15 | `b15-entry` | `b12Top` | `b15Fork` | direction pending |
| B15 | `b15-main` | `b15Fork` | `b15End` | direction pending |

The unnumbered `b11-l2-link` remains a connector candidate and is not assigned to
B11. No entry in this table is a published route edge.
