# 03: Restore a non-overlapping desktop right inspector

**What to build:** let desktop skiers keep Trail/Route detail visible beside the layout-faithful map without covering it, while retaining the stacked mobile experience.

**Blocked by:** 02: Rebuild the full layout-faithful Fulong Panorama Map.

**Status:** completed

- [x] Desktop uses a map-dominant main column plus a persistent right inspector column; the inspector never overlays the SVG viewport.
- [x] Compact Trail search and Route Planner controls remain above the map instead of returning as a permanent left catalog rail.
- [x] Trail selection shows readable detail in the right inspector while keeping the selected Trail and surrounding mountain visible.
- [x] The inspector can present selected-Trail information and active Route Plan information without forcing the map to move or resize unpredictably.
- [x] Mobile keeps controls → map → route information → Trail detail in a single column with no horizontal overflow.
- [x] Browser layout tests prove desktop inspector/map rectangles do not intersect and that the map remains the dominant content region.
- [x] Existing stable URLs, bilingual UI, evidence display, focus states, and selected-Trail map focus continue to work.
