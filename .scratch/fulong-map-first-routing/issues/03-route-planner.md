# 03: Plan schematic routes between Trails

**What to build:** Let a skier choose a starting Trail and destination Trail, derive a valid directed Route Plan through published Trail and Lift topology, highlight the full sequence on the Panorama Map, and list the ordered route steps below it.

**Blocked by:** 02: Expand the global Fulong Trail topology.

**Status:** completed

- [x] Route controls let the user choose a starting Trail and destination Trail without displacing the map.
- [x] The planner uses only published evidence-backed Trail/Lift topology and never invents an unsupported connection.
- [x] A successful Route Plan highlights every Trail/Lift Route Segment and presents the ordered sequence in text.
- [x] An unsupported route produces a clear no-route state rather than partial or guessed guidance.
- [x] Route UI states that the plan is schematic, season-scoped, non-GPS, and not live operating/safety guidance.
- [x] Route interaction remains keyboard accessible and works at 390px without horizontal overflow.

## Comments

Implemented a directed BFS over the published Trail/Lift graph. A Route Plan includes the chosen start and destination Trails plus the shortest supported intermediate segment sequence by edge count. B1 → D1 is covered as a cross-mountain tracer route (`B1 → L5 → C6 → C8 → C9 → D1`); A1 → B1 intentionally returns no route because the current evidence-backed graph does not support a connection to B1's start node. Route controls are a compact popover and successful plans render below the map while highlighting every mapped segment.
