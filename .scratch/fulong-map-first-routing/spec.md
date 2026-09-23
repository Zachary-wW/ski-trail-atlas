# Fulong Map-First Atlas and Route Planning

**Status:** ready-for-agent

## Problem Statement

The current Fulong experience is still shaped like a data page around a map. Text is too small for comfortable reading, the left Trail Catalog consumes valuable map area, and the right Trail inspector competes with the Trail geometry. This is especially poor for actual ski-day use, when a skier repeatedly looks up different Trails and needs the mountain context to remain visible.

The current Panorama Map also covers only five interactive Trails. The newly supplied high-resolution Fulong panorama exposes enough structural evidence to reconstruct the broader published mountain network. A skier also needs to understand how to move between Trails using the connected Trail and Lift topology rather than viewing Trails in isolation.

## Solution

Turn the product into a map-first Fulong atlas. Replace the persistent left rail with a compact search control above the map. Let the Panorama Map occupy the dominant visual area. Selecting a Trail should focus the map naturally and show readable Trail details in a bottom sheet or detail strip below the map instead of covering adjacent geometry.

Expand the evidence-backed topology to the 33 published Fulong Trails represented in the current parameter source, plus supported Lift and junction topology visible in the high-resolution panorama. Preserve planned-but-unpublished lines such as C11/C12/E1 only as research context; do not silently promote them into the 33-Trail Catalog.

Add a schematic Route Planner that connects a starting Trail to a destination Trail through directed Trail and Lift edges. Route output is an evidence-derived relative sequence, not GPS navigation, real-time operations, safety advice, or a personalized recommendation.

## User Stories

1. As a skier, I want readable text without zooming the browser, so that I can use the atlas outdoors and on a laptop without eye strain.
2. As a skier, I want one compact Trail search box above the map, so that search does not steal mountain space when I am not using it.
3. As a skier, I want search results to appear only while I search, so that the map remains the default surface.
4. As a skier, I want the map to remain the largest element on desktop and mobile, so that I can understand where Trails sit relative to each other.
5. As a skier, I want to click a Trail directly on the Panorama Map, so that I can explore spatially instead of through a catalog.
6. As a skier, I want the map to focus the selected Trail automatically, so that small or dense Trails are easier to inspect.
7. As a skier, I want selected Trail details below the map instead of over the map, so that details never hide neighboring Trails.
8. As a skier, I want a selected Trail to keep its stable direct URL, so that I can share it.
9. As a skier, I want the 33 published Trails represented on the global Fulong map, so that the atlas reflects the whole published Trail Catalog rather than five examples.
10. As a skier, I want Trail difficulty to remain visually distinguishable, so that I can scan the mountain structure quickly.
11. As a skier, I want major Lifts and junctions represented, so that I can understand how uphill access connects Trail zones.
12. As a skier, I want planned-but-unpublished lines visually and semantically separated from published Trails, so that I do not confuse plans with the current Catalog.
13. As a skier, I want to choose a starting Trail and a destination Trail, so that I can understand how to move through the mountain between them.
14. As a skier, I want a Route Plan to show the ordered Trail/Lift sequence on the map, so that the connection is spatially understandable.
15. As a skier, I want route steps listed below the map, so that I can read the sequence without relying on color alone.
16. As a skier, I want impossible or unsupported routes to fail explicitly, so that the product never invents a connection.
17. As a skier, I want Route Plans to state that they are schematic and not live navigation, so that I do not mistake the atlas for operational guidance.
18. As a mobile user, I want search, map interaction, Trail details, and Route Planning without horizontal overflow, so that the experience works on the mountain.
19. As a keyboard user, I want search, Trail selection, map controls, and route controls to remain keyboard operable.
20. As a bilingual user, I want the existing English/Chinese switch to keep working across search, detail, and route UI.

## Implementation Decisions

- Preserve React, TypeScript, Vite, vanilla CSS, stable Trail URLs, bilingual copy, and the claims-first publication boundary.
- Replace the persistent Trail Catalog rail with a compact search-and-results control that progressively discloses matching Trails.
- Move Trail detail presentation out of the map viewport into a bottom detail sheet/strip. Desktop should prefer a horizontal summary; narrow layouts may stack the same information vertically.
- Increase the product typography scale. Metadata may remain compact, but ordinary labels and controls must not depend on 7–10px text.
- Selecting a Trail from search or the map should synchronize the stable URL, highlight the Trail, and focus the SVG view around the selected Trail with padding.
- Treat the supplied high-resolution Fulong panorama as reference-only evidence. Reconstruct an original schematic network; do not ship the raster or reproduce its decorative composition, icons, typography, or exact artwork.
- Expand the Trail Catalog to the 33 named Trails in the current season-aware parameter source. Trail attributes come from field-level Claims; geometry/topology remains separately sourced and uncertainty-aware.
- Extend each routable Trail Location with directed topology endpoints. Trails are downhill edges; Lifts are uphill edges. Unsupported or unlocated Trails do not participate in routing.
- Route Planning accepts a starting Trail and destination Trail. The planner finds a directed path over published Trail/Lift edges and returns an ordered Route Plan. V1 optimizes for a simple valid connection/few transitions, not physical distance, time, difficulty, safety, or operating status.
- Route highlighting must coexist with Trail selection. Route steps use line treatment plus labels/listing so meaning never depends on color alone.
- Planned lines visible in the reference panorama but absent from the 33-Trail published inventory remain outside the Trail Catalog and routing graph unless a future Claim promotes them.

## Testing Decisions

- Test external behavior at the content compiler and browser seams rather than component internals.
- Content tests must reject Trail topology endpoints that reference missing Map Nodes, reject route edges without evidence, and preserve the published 33-Trail inventory boundary.
- Browser tests must cover compact search disclosure, Trail selection and automatic focus, unobstructed bottom details, stable URLs, route planning and route highlighting, impossible-route handling, bilingual UI, keyboard behavior, and mobile overflow.
- Visual/layout QC must verify that ordinary UI text is readable and that the detail surface does not overlap the interactive map.
- Existing Trail detail, evidence, zoom/pan, direct-link, contrast, and Pages tests remain regression constraints.

## Out of Scope

- GPS positioning or turn-by-turn navigation.
- Real-time Trail/Lift opening status or queue times.
- Safety guarantees, avalanche guidance, or personalized ability recommendations.
- Computed travel time, geographic distance, vertical meters, or fastest-route claims.
- Copying or distributing the user-supplied panorama raster.
- Additional Resorts beyond Fulong.

## Further Notes

- The current source page describes 33 named Trails. The high-resolution panorama also shows planning/reference labels that are not part of that published 33-Trail inventory; those boundaries must remain visible in the data model.
- The Panorama Map is an original relative-topology illustration. Route Planning inherits the same non-navigation disclaimer and verification states.
