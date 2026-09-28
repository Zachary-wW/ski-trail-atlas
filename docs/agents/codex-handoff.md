# Current handoff

Updated: 2026-09-28.

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

Second correction: the user authorized joins across original-image gaps. L2's
upper station is shared by D1/D2/A9/A10; B15/B13 and the central bend were
resegmented; the F8/F9-adjacent trail reaches teaching. C11/C12 are user-reported
existing trails; F8/F9 are tentatively hidden in the vector layer. See the review
record's second-correction section before applying the earlier counts or planned
statuses. Undirected connectivity checks are separate from directed ski routing.

Third correction supersedes the second pass's trail assignments: the user's
colored annotation identifies the full central loop as B11, the lower black
continuation as B12, and two gray links as separate connectors. B8's former
`b8-2` is now the excluded `b8-b7-link` in the full-map view; therefore earlier
claims of identical east route results no longer apply to the full-map draft.
See the third-correction section of the review record and the new annotated
sector button. The historical east module is intentionally unchanged.

Fourth correction: C5/C7 share a junction; C1's false left stub was removed;
A7/A8 share a start. The annotation palette is retired in favor of uniform
solid trails, thinner connectors and purple dashed transports with square known
stations/type labels. The B11/B12 assignments remain unchanged.

Fifth correction supersedes the fourth pass's false B11–A7/A8 junction:
A7/A8 have their own fork on the L2 approach, with a building gap to B11.
A8 is nearly straight; A7 bows right. C1 is split at the new unnumbered
restaurant corridor below E1. L3/L5/L7 tops share the summit; the old `l3Top`
node remains only a western trail junction. L5 has a marked intermediate
alighting station, without guessed boarding/ground-route edges. Current counts:
65 segments, 51 excluded from directed routing. This still awaits user visual
acceptance; do not restore the rejected connection to satisfy connectivity.

Sixth correction is display-only: deduplicated terminal symbols render after
all cable paths, with solid arrival caps bridging dash gaps at known top stations.
All trail/connector/selection/route strokes are 3px, non-scaling. Default
see-through mode removes broad white casing, makes strokes/label plates
translucent and keeps text legible; the toggle restores solid strokes.
Difficulty colors remain future evidence-backed work, not guessed from codes.

Seventh correction addresses actual geometry, not just station rendering:
C3 now starts at `summit` and the unused `c3Upper` is removed; L5's upper
dogleg is replaced by a curve into the same point. D1/A9/A10 fan away from L2
with readable separation, preserving all shared nodes and downstream corridors.
B11 is tangent-continuous across its four segments; B13's endpoint and the
internal B11 bend move slightly to match the arc. The house gap stays intact.
Counts remain 65/51 (total/excluded). New tests check summit trail starts,
sampled fan-out spacing, B11 join angles and L5's approach, not just endpoints.

## Known legacy gaps

The existing app remains intact. Its 33 records are a parameter-source scope,
not a complete inventory of the supplied map. Geometry/topology mismatches,
missing narrative/video content, and Fulong-specific imports remain to be fixed.
Passing legacy tests is regression evidence only.

Historical specs remain under `.scratch/`; duplicate deployable design previews
were removed while the originals remain under `prototypes/design-directions/`.
No automatic push/deployment is part of this handoff.
