# 03: Plan schematic routes between Trails

**What to build:** Let a skier choose a starting Trail and destination Trail, derive a valid directed Route Plan through published Trail and Lift topology, highlight the full sequence on the Panorama Map, and list the ordered route steps below it.

**Blocked by:** 02: Expand the global Fulong Trail topology.

**Status:** ready-for-agent

- [ ] Route controls let the user choose a starting Trail and destination Trail without displacing the map.
- [ ] The planner uses only published evidence-backed Trail/Lift topology and never invents an unsupported connection.
- [ ] A successful Route Plan highlights every Trail/Lift Route Segment and presents the ordered sequence in text.
- [ ] An unsupported route produces a clear no-route state rather than partial or guessed guidance.
- [ ] Route UI states that the plan is schematic, season-scoped, non-GPS, and not live operating/safety guidance.
- [ ] Route interaction remains keyboard accessible and works at 390px without horizontal overflow.
