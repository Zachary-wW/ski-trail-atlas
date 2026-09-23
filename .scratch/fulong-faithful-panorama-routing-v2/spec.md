# Fulong Layout-Faithful Panorama and Mountain Routing V2

**Status:** ready-for-agent

## Problem Statement

The current product has the right interaction primitives—search, clickable Trails, stable Trail URLs, topology-aware routing, bilingual UI—but the Panorama Map is still the wrong mountain. Its current SVG rearranges the Resort into a cleaner schematic composition instead of preserving the spatial layout of the user-supplied high-resolution Fulong panorama. For a skier who knows Fulong, that breaks trust immediately: Trail shapes, ridge relationships, transport lines, stations, and base-area structure do not visually match the map they already use.

The current desktop Trail detail placement also over-corrected the previous overlap problem by moving the entire detail surface below the map. That keeps geometry visible but makes the skier scroll away from the map to read detail. Desktop users need a persistent right-side inspector that never overlays the map; mobile users can continue to stack detail below.

Finally, the current Route Planner assumes routes start with one Trail and end with another Trail. Real ski-day journeys often start or finish at a Base, Summit, lift/gondola/magic-carpet station, or transfer point. Uphill facilities also need explicit types so the user can distinguish skiing from riding a chairlift, gondola, or magic carpet.

## Solution

Rebuild the Fulong Panorama Map around the uploaded high-resolution panorama as the accepted spatial layout reference. Preserve its relative mountain composition instead of generating a new schematic arrangement. Recreate terrain, trees, buildings, icons, typography, and other artwork in an original editorial-cartography style; do not publish the uploaded raster or rely on a visual filter over third-party pixels unless rights are later confirmed.

Establish a reference-calibration workflow that lets an implementer compare the redrawn SVG against the uploaded panorama during development. The production SVG should retain the reference layout for all published Trails, supported Uphill Transports, Transport Stations, junctions, and major Places. Reference-only lines or facilities visible on the panorama but unsupported by the published catalog remain contextual Map Reference Features and never become routable by visual inference.

On desktop, make the map and right-side inspector siblings in layout so the inspector cannot cover map geometry. The map remains the dominant region. On mobile, keep the existing stacked order: controls, map, route information, Trail detail.

Generalize Route Planning around Route Endpoints. Users can choose a Trail, Transport Station, or Place as a start/destination. Uphill facilities use typed Uphill Transport records and separate top/bottom Transport Stations. The routing graph remains directed and evidence-backed: Trail edges go downhill, Uphill Transport edges go uphill, and no walking/transfer edge is invented merely because two drawn objects are close.

## User Stories

1. As a skier familiar with Fulong, I want the web map to preserve the high-resolution panorama's mountain layout, so that I can recognize the Resort immediately.
2. As a skier, I want Trail shapes and relative positions to follow the reference panorama, so that visual location matches the map I already know.
3. As a skier, I want L1/L2/L3/L5/L7 and other supported uphill facilities to appear in the same relative corridors and station locations as the reference panorama.
4. As a skier, I want Base, Summit, park areas, transport stations, and major junctions to remain spatially recognizable.
5. As a skier, I want decorative trees, buildings, facility icons, and terrain to look original and polished without moving the functional map layout.
6. As a rights-conscious maintainer, I want the uploaded raster to remain a development reference rather than a public site asset unless its reuse rights are confirmed.
7. As a maintainer, I want a calibration method that reveals when the SVG has drifted away from the reference layout.
8. As a maintainer, I want reference-only lines such as planned/unpublished Trails to remain visibly distinct from published Trails.
9. As a maintainer, I want a map-only feature that lacks publication evidence to stay non-interactive and non-routable.
10. As a desktop user, I want Trail detail visible beside the map, so that I can inspect a Trail without scrolling away from its surroundings.
11. As a desktop user, I want the right inspector to consume its own layout column rather than overlay map pixels.
12. As a desktop user, I want the map to remain the largest content region even with the inspector open.
13. As a mobile user, I want Trail detail below the map, so that the narrow screen stays readable.
14. As a skier, I want selecting a Trail to focus it while retaining enough surrounding mountain context to orient myself.
15. As a skier, I want search to stay compact above the map rather than returning as a permanent left rail.
16. As a skier at Fulong Base, I want to select Base as my route start without pretending I am already on a Trail.
17. As a skier at the Summit, I want to select Summit as my route start.
18. As a skier at a lift top station, I want to select that exact station as my route start.
19. As a skier trying to reach a lift bottom station, I want that station to be a route destination.
20. As a skier, I want Trails, Places, chairlift stations, gondola stations, and magic-carpet stations grouped distinctly in the Route Planner.
21. As a skier, I want L5 Top and L5 Bottom to be separate choices, so that a transport name is never directionally ambiguous.
22. As a skier, I want a route starting with a Trail to include skiing that Trail as the first movement step.
23. As a skier, I want a route ending with a Trail to include skiing that Trail as the final movement step.
24. As a skier, I want a Place or Transport Station endpoint to begin/end directly at its Map Node without adding a fake movement step.
25. As a skier, I want route steps to say whether I should ski, ride a chairlift, ride a gondola, or ride a magic carpet.
26. As a skier, I want route highlighting to follow the layout-faithful map rather than a separate schematic graph.
27. As a skier, I want unsupported routes to fail explicitly instead of connecting nearby SVG lines by proximity.
28. As a skier, I want routing disclaimers to remain visible because the map is schematic, not GPS or live operations guidance.
29. As a bilingual user, I want all new endpoint groups, transport types, inspector content, and routing messages in English and Chinese.
30. As a keyboard user, I want route endpoint selection, search, map selection, and the right inspector to remain operable without a mouse.
31. As a mobile user, I want the complete experience without horizontal overflow.
32. As a maintainer, I want the 33 published Trail boundary preserved even when the reference panorama shows additional labels such as planned or map-only lines.

## Implementation Decisions

- The uploaded high-resolution panorama is the layout authority, not a public asset. Public output must be an original redraw unless rights to distribute/transform the raster are confirmed separately.
- Use one reference coordinate frame for the Panorama Map. Trail geometry, Uphill Transport geometry, station positions, junctions, Places, and map-only context features are calibrated in that frame rather than generated from an abstract left/center/right topology layout.
- Establish a development-only calibration mode or equivalent workflow that can place the reference raster behind/over the SVG at adjustable opacity. It must be excluded from production assets and should not require committing the raster to Git.
- Preserve functional layout, not decorative pixels. Relative path shapes, branch/merge relationships, transport corridors, stations, and major landmarks should match the reference; terrain texture, tree art, buildings, typography, legend treatment, and icons should be original.
- Extract/map geometry deliberately. Computer vision may assist candidate extraction, but no path, station, junction, or transport type is published merely because an automated image operation suggests it.
- Preserve the 33 published Trail Catalog as a separate publication boundary. Reference labels/lines visible on the panorama but outside that Catalog are Map Reference Features unless separately supported.
- Replace Lift-only language in the route domain with Uphill Transport. Uphill Transport carries an evidence-backed Transport Type. Supported initial types are chairlift, gondola, magic carpet, and unknown; the UI must not fabricate a subtype when evidence is insufficient.
- Every Uphill Transport has distinct top/bottom Transport Stations bound to Map Nodes. A raw transport object is not a selectable Route Endpoint because it has two directional ends.
- Route Endpoint kinds are Trail, Transport Station, and Place. Trail start semantics include traversal of the selected Trail first; Trail destination semantics include traversal of it last. Station/Place endpoints map directly to their node.
- Named Places such as Fulong Base, West Base, Summit, and any additional clearly supported anchor can be selectable endpoints without becoming movement edges.
- Route Segment kinds remain directed movement edges. A Trail segment represents downhill skiing; an Uphill Transport segment represents an uphill ride and exposes its transport type to the UI.
- Do not introduce walking/transfer edges in this spec unless the reference/evidence explicitly identifies a connector and its endpoints. Visual proximity never creates graph connectivity.
- V1 route optimization remains a simple supported connection/few-transition graph search. Distance, travel time, ability preference, live opening status, queue time, and safety ranking remain out of scope.
- Desktop shell: compact search/route controls above; layout-faithful Panorama Map in the dominant left/main column; persistent right Trail/Route inspector in its own column. The inspector must never overlay the SVG viewport.
- Mobile shell: controls, Panorama Map, Route Plan (when present), Trail detail. No fixed right rail.
- The right inspector should support at least two content modes without moving the map: selected Trail detail and active Route Plan summary. Trail selection remains visible while a route is active.
- Selecting/searching a Trail keeps its stable direct URL and focuses the corresponding reference-faithful geometry with enough padding to retain local context.
- Route mode should normally preserve a wider/global view so all highlighted segments can be understood as one journey.
- Existing claims-first publication rules, Verification State, Season boundaries, bilingual behavior, GitHub Pages deployment, and non-navigation disclaimers remain mandatory.

## Testing Decisions

- Use the content compiler/publication boundary as the highest data seam. Tests must reject missing Map Nodes, stations referencing missing transports/nodes, unsupported transport types, and routing edges without evidence.
- Add domain tests for Route Endpoint resolution: Trail start, Trail destination, Transport Station, Place, same-node endpoints, and unsupported endpoints.
- Keep routing engine tests independent of React. Verify that graph search only follows published directed Trail/Uphill Transport edges and never uses SVG proximity.
- Browser tests should cover grouped endpoint selection, Base/Summit starts, top/bottom station starts/destinations, typed route steps, impossible routes, bilingual labels, keyboard control, and mobile overflow.
- Browser/layout tests should verify desktop detail lives in a separate right column and does not overlap the map viewport; mobile detail remains below.
- Add a reference-fidelity QC seam. At minimum, maintain a set of calibrated control landmarks/normalized anchor positions from the uploaded panorama and verify that published SVG anchors stay within agreed tolerances. During implementation/review, perform side-by-side or overlay visual QC against the same uploaded reference.
- Reference fidelity must be reviewed at desktop map scale for western L3 sector, central L2/L5 sector, eastern L1/L7 sector, beginner/base area, and summit/ridge network—not just one representative Trail.
- Existing tests for all 33 Trail searches/direct links, selected-Trail focus, route failure, contrast, accessibility, and Pages deep links remain regression constraints.

## Out of Scope

- Publishing or redistributing the uploaded high-resolution raster without confirmed rights.
- Pixel-for-pixel copying of the reference map's trees, buildings, icons, labels, logos, textures, or decorative artwork.
- GPS tracks, survey-grade coordinates, turn-by-turn navigation, or geolocation.
- Real-time Trail/transport opening status, queues, snow conditions, or lift outages.
- Fastest/shortest/safest route guarantees, travel-time estimates, or ability-personalized route recommendations.
- Invented walking transfers based only on objects appearing close together in the panorama.
- Expanding beyond Fulong in this iteration.

## Further Notes

- The implementation environment may not always be able to import the current conversation image directly into the Runner. If a local reference fixture cannot be materialized, the implementer must still use the same uploaded high-resolution panorama as the visual source of truth during manual comparison; do not fall back to the current schematic geometry.
- If a local reference fixture is available, keep it development-only and outside the production bundle. A gitignored/local calibration asset is preferred until licensing is explicit.
- The reference panorama contains visual information beyond the 33 published Trail parameter rows. Those features must be inventoried before deciding whether each is a Published Trail, Uphill Transport, Place, or Map Reference Feature.
- The goal is not survey accuracy. The goal is recognizability and structural fidelity to the accepted panorama while preserving the project's evidence and non-navigation boundaries.
