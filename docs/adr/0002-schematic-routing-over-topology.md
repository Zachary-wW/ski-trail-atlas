---
status: accepted
---

# Derive ski routes from evidence-backed topology, not geographic distance

The product will build Route Plans from directed, source-backed Map Nodes, Trail Locations, and Lifts rather than from GPS coordinates or geometric shortest-path calculations. Trails contribute downhill graph edges and Lifts contribute uphill graph edges; a Route Plan is an ordered sequence through that graph and carries the same Season and uncertainty boundaries as the underlying topology. This means v1 can answer “how can I move from this Trail to that Trail?” without pretending to know exact distance, travel time, current opening status, snow conditions, safety, or the best route for a skier’s ability. The trade-off is that routing quality depends on editorial topology completeness, but it avoids unsupported precision and keeps routing consistent with the project’s non-navigation publication boundary.
