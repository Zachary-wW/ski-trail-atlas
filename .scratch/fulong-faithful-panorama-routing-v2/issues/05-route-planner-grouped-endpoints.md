# 05: Route Planner with grouped mountain endpoints

**What to build:** expose the generalized routing model through a skier-friendly Route Planner that distinguishes Trails, Places, chairlift stations, gondola stations, and magic-carpet stations and renders typed movement steps on the faithful map.

**Blocked by:** 03: Restore a non-overlapping desktop right inspector; 04: Generalize Route Endpoints and typed Uphill Transport.

**Status:** ready-for-agent

- [ ] Start and destination pickers group selectable Route Endpoints into Trails, Places, Chairlift stations, Gondola stations, Magic-carpet stations, and an explicit fallback group only when a transport type is genuinely unknown.
- [ ] Transport choices identify the station/direction clearly (for example, L5 Bottom versus L5 Top) rather than offering ambiguous raw transport names.
- [ ] Users can build routes from Base/Summit or a Transport Station to a Trail or another supported endpoint.
- [ ] Route steps distinguish skiing from riding a chairlift, gondola, or magic carpet in both text and visual treatment; meaning does not depend on color alone.
- [ ] The layout-faithful map highlights the same directed Trail/Uphill Transport segments returned by the routing engine.
- [ ] Desktop Route Plan summary lives in the right inspector; mobile Route Plan remains below the map.
- [ ] Unsupported routes show an explicit no-route state and never invent a walking/transfer connection.
- [ ] English and Chinese copy, keyboard operation, stable Trail URLs, and the non-navigation/live-status disclaimers remain complete.
