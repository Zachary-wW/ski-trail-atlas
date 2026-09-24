# Current handoff

Updated: 2026-09-24.

Read [the active MVP plan](../mvp-rebuild.md) before continuing implementation.
Read `CONTEXT.md` and relevant ADRs when changing domain concepts.

## Current work

The user rejected the legacy map's fidelity and provided the exact high-resolution
WEBP. They accepted the corrected east-sector visual baseline for continuing
full-map tracing, plus cleanup of stale/redundant repository content.

The prototype is at `/?prototype=fulong-trace` in development only.
The old `/?prototype=east-trace` alias opens the accepted east sector.
Its source lives beside the map in `src/map/prototype/`.
Setup and reference identity are in
[the calibration contract](../research/fulong-reference-calibration.md).

## Next gate

Review the summit, central, west and beginner sectors with the user. See
[the review record](../trace-pilot-review.md) for checks and unresolved features.
The accepted east geometry remains unchanged, including B3's disconnected lower
endpoint. New segments, the pending upper-entry corridor and all transport marks
are excluded from routing.

Full-map fidelity is not yet accepted. Preserve the prototype on
`codex/fulong-trace-pilot`; do not promote it into production or resume the old V2
Ticket 05 merely because legacy tests pass. After visual acceptance, review
identities/directions and define the production data migration.

## Known legacy gaps

The existing app remains intact. Its 33 records are a parameter-source scope,
not a complete inventory of the supplied map. Geometry/topology mismatches,
missing narrative/video content, and Fulong-specific imports remain to be fixed.
Passing legacy tests is regression evidence only.

Historical specs remain under `.scratch/`; duplicate deployable design previews
were removed while the originals remain under `prototypes/design-directions/`.
No automatic push/deployment is part of this handoff.
