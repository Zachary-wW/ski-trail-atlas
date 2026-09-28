# Fulong tracing review

Updated: 2026-09-28. Status: **the overall structural baseline is accepted for
content-MVP continuation; route direction and publication evidence remain pending**.

The user's confirmation authorizes content-MVP continuation, not production
promotion or verification of every travel direction.

## What was checked automatically

- `npm run typecheck` — passed.
- `npm run test:content` — 6 files, 51 tests passed after the seventh correction.
- `npm run test:e2e` — 32 tests passed after the seventh correction.
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

## Remaining review boundary

Compare `/?prototype=fulong-trace` against the supplied image:

1. Summit C1/C2/C3 branches, C5–C10 and their junctions.
2. West C3, D1/D2, C11/C12 and L3 endpoints; C11/C12 now use user-reported built status.
3. Central B11/B12/B13/B15, C13 and the separately identified gray connectors.
4. A7–A10 park corridors and beginner A1/A2/A3/A5/A6 with carpet positions.
5. Missing or misidentified features, especially repeated C3 and unlocated B16.

The user has since accepted the overall structural baseline as sufficiently
stable for the content MVP. The items above remain editorial/data review work:
they are not reasons to redraw the accepted visual baseline, and they remain
excluded from production routing until identity, direction and evidence are
reviewed. Keep this prototype isolated until a production migration is explicit.

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

## Third user correction — colored annotation, 2026-09-24

The local source `artifacts/reference/fulong-central-user-annotation.png` is the
user's supplied 1470 × 1110 annotation (SHA-256
`c613099b4740535b57a657de22be4e0ad4cf173d0d65c01eb3a2282032c4faff`).
It remains gitignored and is not published. This correction supersedes the
second pass's ownership of the central curve and the lower B11 segment.

- Yellow: B10's existing geometry.
- Green: four connected B11 segments, from `central` through `b15End`, `b13End`,
  `b11Upper`, to `b12End`. The former anonymous central curve is now B11.
- Red: B9 and the local B12/B13/B15 black runs. The continuation from
  `b12End` to `westLower` belongs to B12, not B11.
- Gray: new `b11-l2-link` and reclassified `b8-b7-link`. The latter retains the
  old `b8-2` geometry but no longer belongs to B8 or the directed candidate graph.
- The original visible L2–A8–A7 corridor remains unnumbered rather than B11.

At this historical stage, the annotation palette was a review aid, with a text legend and
toggle, not a global difficulty palette. Selection widens marked lines without
changing their annotation color. A dedicated view frames the annotated region.
The third-round draft had 64 segments, 35 code groups, 3 reference features and
9 transport records; 50 segments are excluded from directed routing.

Added checks lock down the B11 ownership sequence, the lower black segment,
both gray links, full-loop selection, displayed colors, toggle behavior and
mobile width. The pre-existing crossing and connectivity regressions remain
enabled. Prior east route equivalence is historical: the newly identified gray
right-side link is now excluded pending direction review.

## Fourth user correction — connectivity and visual separation, 2026-09-28

- C5 starts at a shared junction on C7; C7 is split there without moving the
  separate C6 ridge fork.
- Removed `c2-branch` and its unused `c2Upper` node: the user identified the
  short isolated stroke left of C1 as non-trail. C1 and the lower C2 remain.
- A7/A8 both start at `b11Upper`. The L2 approach is one unnumbered segment;
  the old intermediate `a8Top` and `a8-a7-link` are removed.
- B11 retains all four third-round segments and B12 retains the lower black
  continuation. Annotation colors and the toggle were removed, not ownership.
- All unselected trails use blue-green solid strokes; connectors are thinner.
  Reference features remain gray/dashed. Selection and route highlight stay
  separate from difficulty/operational status.
- Transports render over trails with white casing, purple dashes, square known
  stations and explicit “索道” / “魔毯” labels. Carpet labels are staggered to
  prevent F5/F6 overlap. Unknown cable subtypes/stations remain unknown.

Fourth-round totals: 63 segments, 35 code groups, 3 reference features, 9 transport
records; 49 segments excluded from directed routing. Three new content
regressions first failed on the old geometry and passed after correction.
Browser tests preserve B11 selection, check uniform strokes in overlay and
redraw modes, transport line/symbol/label distinction and mobile width.
The existing actual-SVG crossing check still passes without relaxed tolerance.

Local screenshots at 1440 × 1080 and 390 × 844:
`artifacts/inspection/fourth-{summit,central,full,mobile}.png`.
These are inspection artifacts, not evidence of user acceptance or operational
route approval. The source image and production page remain unchanged.

## Fifth user correction — building gap and lift stations, 2026-09-28

This supersedes the fourth pass's incorrect attachment of A7/A8 to B11.
The user's new red-line crop and the native WEBP are the calibration evidence.

- The shared A7/A8 fork is `(1918,820)`, reached from L2. A8 descends nearly
  straight; A7 bows right through approximately `(2033,959)` before returning
  downhill. It no longer follows the L5 corridor or starts from B11.
- B11 retains its own node/curve. A house symbol and “房屋隔断 · 不直连”
  make the local gap visible. No direct link bridges it. Indirect connectivity
  via the previously confirmed B11–L2 corridor is not a bridge across the house.
- C1 is split at `(2084,302)` for an unnumbered ground corridor to the
  restaurant/eastern junction, separate from the E1 planned feature.
- L3/L5/L7 upper endpoints all reference `nodes.summit`; visible paths terminate
  there too. The western trail junction's coordinates remain unchanged and
  its name no longer claims to be L3's terminal. L7's off-image bottom is unknown.
- L5's path explicitly passes through `(2005,553)`, with a structured
  intermediate station and a red ring labelled “L5 中途站 · 可下客”.
  Boarding permission and ground exits are unknown, and no routing edge was added.

Current totals: 65 segments, 35 code groups, 3 reference features, 9 transport
records with one intermediate stop; 51 segments excluded from directed routing.
Four regression assertions failed before the fix and passed afterward.
Browser checks sample A7/A8 against native reference corridor bands, retain the
unrelaxed no-crossing guard, and check the station label is inside the central
viewBox. Local overlay/redraw screenshots are saved as
`artifacts/inspection/fifth-{central,summit}-{overlay,redraw}.png`;
mobile capture is `artifacts/inspection/fifth-mobile.png`.
This remains a local candidate, not user-accepted fidelity or operational routing.

## Sixth correction — terminal rendering, width and see-through layers

The fifth pass already put L3/L5/L7 path endpoints at `(1960,205)`, but repeated
station rectangles were interleaved with cable paths and opaque 6px casings.
Dashed arrival gaps also made the last portion look disconnected. Station
coordinates alone were therefore an insufficient display test.

- Deduplicate terminal symbols by position and paint them after all cables.
  Known top endpoints have solid arrival markers; the summit has one square.
- Use 3px non-scaling strokes for trails, connectors, selection and route
  highlights. Selection remains visible through color and the selected label.
- Remove wide white trail bands and transport casings. Default “透视叠加”
  uses translucent lines and label plates, with a faint continuous cable guide;
  station outlines/text stay readable. A checkbox restores solid linework.
- Put transport labels after all linework, rather than inside each cable's
  painting group. Transparency changes visual layering only, not topology.
- Difficulty colors await per-trail evidence review; they will include textual
  labels and an unknown/conflicting category rather than inferred code colors.

Added regression first failed on the previous rendering. It checks a single
shared terminal, all three actual SVG endpoints against its center, solid
arrival markers, paint order, equal widths in both modes and while routing/
zooming, alpha toggle behavior, opaque text and mobile width.
Screenshots: `artifacts/inspection/sixth-{summit,central}-{overlay,redraw}.png`
and `sixth-mobile.png`. Geometry and candidate routing eligibility are unchanged.

## Seventh correction — three yellow-box geometry findings

The user identified a detached-looking summit, compressed L2 departures and a
polygonal B11 bend. Native reference crops were inspected, not just the previous
vector output.

- C3 still started at `(1945,222)` rather than the shared summit. It now starts
  at `summit`; the unused node is removed. L5's old `(2006,222)` dogleg is
  replaced by a continuous curve into `(1960,205)`, preserving its midstation.
- D2/D1/A10/A9 keep their common L2 origin and relative corridor order, but fan
  apart after the junction. This is a deliberate local spacing adjustment for
  readability, not an assertion of native-pixel fidelity or actual widths.
- B11's four pieces are re-fitted as a smooth arc. The B13 join is `(1977,794)`
  and the internal bend `(2012,819)`; identities and graph connectivity remain.
  Its start is kept below C13 without crossing it. A7/A8's building gap remains.

New tests failed on detached C3 and a ~11-pixel departure gap before correction.
The corrected D2/D1/A10 gaps at native x=1700/1600 are approximately 29–39
vertical pixels; tests enforce >15 pixels at these inspection sections and
<15° tangent change at B11 segment joins. These are regression guards, not
whole-map acceptance tolerances. The existing no-crossing test passes unchanged.
Full checks: 51 content tests, 32 browser tests, typecheck/build and diff checks.

Local images: `artifacts/inspection/seventh-{summit,central}-{overlay,redraw}.png`,
`seventh-l2-source.png`, and `seventh-mobile.png`. Full-map fidelity still awaits
user review; no production routing or publication change is included.

## Eighth correction — transparent L5 intermediate station

In see-through mode, the L5 midstation circle is hollow: its fill opacity is
zero while the red outline, leader and label remain visible. This prevents the
station marker from covering the underlying source map or trail information.
Turning see-through off restores the solid white center for calibration. The
targeted browser regression checks both states; content topology and route
eligibility are unchanged. Screenshot:
`artifacts/inspection/eighth-central-midstation-transparent.png`.
