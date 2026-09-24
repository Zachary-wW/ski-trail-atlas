# Fulong tracing review

Updated: 2026-09-24. Status: **east visual baseline accepted for continuation;
full-map candidate geometry awaiting review**.

The user's confirmation authorizes full-map tracing, not production promotion
or verification of travel directions.

## What was checked automatically

- `npm run typecheck` — passed.
- `npm run test:content` — 6 files, 42 tests passed after the second correction.
- `npm run test:e2e` — 28 tests passed after the second correction.
- `npm run build` — passed.
- Production build output contains only the legacy JPG and favicon; it does not
  contain the development-only prototype module or the local high-resolution WEBP.

## Accepted east baseline

- The exact local WEBP is rendered in original 3631 × 2560 coordinates.
- Overlay, source-only, and independent-linework modes share one viewBox.
- B1, B2, B3, B5, B6, B7, B8, B9 and B10 have selectable candidate segments.
- The B8 lower segment now follows the source's rightward bulge before returning
  toward the B7/B8 junction.
- The previously missing upper corridor into the B5/B6/B7 junction is drawn as
  `upper-entry-link`, with identity/direction pending and routing excluded.
- Segment paths are the same paths used for linework, click targets and route
  highlighting.
- Shared nodes are visible on demand.
- B3's lower candidate endpoint is intentionally open; the pilot does not
  invent a B1 connection.
- L1 and L7 remain contextual transport corridors and are not silently added
  to the pilot route graph.

## Earlier east pilot browser smoke

Checked in local Chrome at 1512 × 1150 and 390 × 844:

- Source endpoint returns the WEBP successfully.
- All 9 trail selectors and 16 candidate segments render.
- Mouse selection and keyboard selection update the same selected trail.
- All three modes and the opacity control update the source layer correctly.
- A forward demonstration has 4 steps and exactly 4 highlighted segments.
- Reverse traversal and the unresolved B3 lower connection return no path.
- Identical endpoints return an empty route, not an error or invented movement.
- Keyboard zoom, pan and reset work; 12 node markers can be shown/hidden.
- Mobile document width is 390 px at a 390 px viewport; no horizontal overflow.
- No page-level JavaScript errors were observed.
- The corrected B8 curve and the pending upper-entry corridor are visible in
  the overlay and independent-linework modes.

Desktop overlay, independent-linework and mobile screenshots were inspected.
Local inspection artifacts are under `artifacts/inspection/` and are not shipped.
This smoke does not establish a numeric geometric error bound.

## First full-map expansion checks (before second user correction)

The primary URL is `/?prototype=fulong-trace`; the old east URL remains supported.
New geometry uses native WEBP coordinates, not the legacy application's curves.
The first pass had 58 segments, 33 trail-code groups, 5 reference features and
11 transport records (5 cable corridors and 6 carpet groups, including the
combined F1/F2 record). The pre-correction pass had 42 newly traced full-map
segments plus the pending east `upper-entry-link`; the current corrected counts
are recorded below.

Local Chrome checks at 1512 × 1150 and 390 × 844 verified:

- Unique segment ids, existing endpoints and notes on unnamed segments.
- All 16 east paths preserved, and identical route sequences for all 144 ordered
  pairs of the 12 east nodes.
- All six sector buttons select their exact native-coordinate viewBox.
- C3 shows its repeated-label note; B16 has no drawn paths; C11 is planned and
  excluded from routing.
- Summit → L3 base returns no annotated route; ridge → teaching has four steps
  and no excluded segment is highlighted. Unknown endpoints return no route.
- Mobile A1 selection works without horizontal overflow.
- The old URL defaults to the east view.

Full-map overlay, linework, regional overlays and mobile screenshots were
inspected under `artifacts/inspection/`. These checks do not establish a numeric
geometric error bound.

## Human review still required

Compare `/?prototype=fulong-trace` against the supplied image:

1. Summit C1/C2/C3 branches, C5–C10 and their junctions.
2. West C3, D1/D2, C11/C12 and L3 endpoints; C11/C12 now use user-reported built status.
3. Central B11/B12/B13/B15, C13 and the separate unnumbered curved connector.
4. A7–A10 park corridors and beginner A1/A2/A3/A5/A6 with carpet positions.
5. Missing or misidentified features, especially repeated C3 and unlocated B16.

This is not full-map acceptance. New paths remain excluded from routing until
identity, directions and connections are reviewed. The B3 lower connection and
upper-entry corridor also retain their earlier unresolved states. Keep this
review prototype isolated until a production migration is explicitly undertaken.

## Second user correction — 2026-09-24

The user authorized topology corrections to gaps in the original illustration:

- D1, D2, A9 and A10 now share `centralHub`, the L2 upper station.
- B15 branches from the B12 approach and shares a fork with B13. Its lower end
  joins the redrawn central bend, which joins B13 before the B11/A7 junction.
  This bend no longer cuts across C3 toward L2.
- C3 is split at its C6 crossing; A8 shares a node with B11.
- The former F8/F9-adjacent corridor reaches `teaching`.
- C11/C12 are trail-code groups, rendered as solid lines, with user-reported
  opening in 2025 (exact season/date unconfirmed). They are not live-open claims.
- F8/F9 are hidden from the vector transport layer based on the user's tentative
  removal report. The original reference image is unchanged.

Counts after correction: 63 segments, 35 code groups, 3 reference features,
9 transport records; 48 segments remain excluded from directed routing.
The east baseline itself is unchanged.

New regression checks cover shared nodes, reported status, removed vector marks,
the teaching connection, segment integrity, and undirected connectivity of all
non-isolated-teaching trails without enabling reverse skiing. Browser checks
sample SVG paths every 3 native pixels and reject intersections away from a
shared node (3-pixel numerical tolerance), excluding aerial transports and E1.
This sampling is a regression guard, not a mathematical proof of planarity.
Central, western and beginner overlays were inspected after the corrections.
All 16 east paths and all 144 ordered east-node route results were rechecked and
remain unchanged. The structural graph has one main component and four separate
teaching components (A6, A5, A3, A1/A2); planned E1 is not needed for main-network
connectivity.
