# Fulong map inventory — candidate boundary

Updated: 2026-09-28. **User-reviewed structural candidate; not a published inventory.**

The old document reported a completed full-map fidelity review without
reproducible per-path comparison evidence. That conclusion is withdrawn.
The active reference is identified in [the calibration contract](fulong-reference-calibration.md).

## Three different scopes

| Scope | Present state |
| --- | --- |
| Legacy parameter catalog | 33 source-listed records; not a claim about total map coverage |
| Accepted east visual baseline | B1, B2, B3, B5, B6, B7, B8, B9, B10; travel directions remain unverified |
| Current full-map structural candidate | 65 segments, 35 trail-code groups, 3 reference features, 9 transport records; identity, direction and evidence review remain |

## Items requiring reconciliation

- C11/C12 were planned in the source image, but the user reports opening in 2025.
  They are now selectable trail-code groups with explicit user provenance and
  remain direction-pending. E1 remains planned.
- C13 is traced as map-only context. The user identified its lower curved neighbor
  as B11 in the third correction, rather than an unnumbered connector.
- B11 follows the complete leftward loop from B10's lower junction to B12.
  B12 includes the black run below this merge. The B11–L2 and B8/B9–B7 gray
  connections are separate unnumbered segments.
- B16 is mentioned in the MOGUL legend but remains unlocated with no geometry.
- Transport records include L1/L2/L3/L5/L7 and four carpet groups:
  F1/F2, F3, F5, F6. F8/F9 are hidden from the vector layer following the user's
  tentative removal report; this is not an independently verified removal.
  F1/F2 retains two parallel lines in one combined record;
  individual identities and boarding connections are not inferred.
- C3 appears on both the summit black line and western green line. They share a
  code-group selector with an ambiguity note, not a verified continuous route.
- A reference label and an older parameter row must not be joined solely because
  their codes look similar. Check location, name, source version and season.

Future inventory rows must record the reference location, identity/status,
candidate geometry, source, unresolved questions and review result.
Keep unknown features visible as context where appropriate, without creating
published trail records or route connections.

Fourth correction connects C5 to C7, removes the non-trail stub left of C1
without deleting lower C2, and gives A7/A8 one shared start. The old annotation
colors remain provenance only; all trails now share a display color. These
visual/undirected corrections do not verify downhill directions.

Fifth correction separates that fork from B11 across the building gap and
recalibrates the A7/A8 curves. The corridor below E1 connects C1 to the
restaurant but remains unnumbered and direction-pending. L3/L5/L7 upper
stations now share the summit; L5 additionally has a user-confirmed intermediate
alighting station. Its boarding permissions and ground exit remain unverified.

The accepted east baseline lives in `src/map/prototype/east-trace-data.ts`; the
full-map candidate geometry lives in `src/map/prototype/fulong-trace-data.ts`.
Do not duplicate coordinate tables here.
