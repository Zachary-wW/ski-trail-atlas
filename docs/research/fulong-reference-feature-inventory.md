# Fulong map inventory — reconciliation required

Updated: 2026-09-24. **First full-map candidate pass; not a complete or accepted inventory.**

The old document reported a completed full-map fidelity review without
reproducible per-path comparison evidence. That conclusion is withdrawn.
The active reference is identified in [the calibration contract](fulong-reference-calibration.md).

## Three different scopes

| Scope | Present state |
| --- | --- |
| Legacy parameter catalog | 33 source-listed records; not a claim about total map coverage |
| Accepted east visual baseline | B1, B2, B3, B5, B6, B7, B8, B9, B10; travel directions remain unverified |
| Full-map candidate pass | 58 segments, 33 trail-code groups, 5 reference features, 11 transport records; new regions awaiting review |

## Items requiring reconciliation

- C11, C12 and E1 appear as planned lines; distinguish them from usable routes.
- C13 is traced as map-only context. Its lower unnumbered curved neighbor is a
  separate connector, not automatically assigned to C13.
- B16 is mentioned in the MOGUL legend but remains unlocated with no geometry.
- Transport records include L1/L2/L3/L5/L7 and six carpet groups:
  F1/F2, F3, F5, F6, F8, F9. F1/F2 retains two parallel lines in one combined record;
  individual identities and boarding connections are not inferred.
- C3 appears on both the summit black line and western green line. They share a
  code-group selector with an ambiguity note, not a verified continuous route.
- A reference label and an older parameter row must not be joined solely because
  their codes look similar. Check location, name, source version and season.

Future inventory rows must record the reference location, identity/status,
candidate geometry, source, unresolved questions and review result.
Keep unknown features visible as context where appropriate, without creating
published trail records or route connections.

The accepted east baseline lives in `src/map/prototype/east-trace-data.ts`; the
full-map candidate geometry lives in `src/map/prototype/fulong-trace-data.ts`.
Do not duplicate coordinate tables here.
