# 04: Generalize Route Endpoints and typed Uphill Transport

**What to build:** extend the evidence-backed routing domain so a route can begin/end at a Trail, Transport Station, or Place, and uphill ride segments retain whether they are chairlift, gondola, magic carpet, or explicitly unknown.

**Blocked by:** 02: Rebuild the full layout-faithful Fulong Panorama Map.

**Status:** ready-for-agent

- [ ] Add a Route Endpoint concept that resolves Trail, Transport Station, and Place selections to precise graph semantics without using free-form coordinates.
- [ ] Replace Lift-only routing assumptions with Uphill Transport records carrying an evidence-backed Transport Type: chairlift, gondola, magic carpet, or unknown.
- [ ] Model each supported uphill facility with separate top/bottom Transport Stations bound to Map Nodes; a raw transport name is not itself a selectable endpoint.
- [ ] Preserve Trail endpoint semantics: a start Trail is traversed first and a destination Trail is traversed last.
- [ ] Station and Place endpoints start/end directly at their bound Map Node without adding fake movement segments.
- [ ] Preserve existing Trail-to-Trail Route Plans while adding tests for station-to-station, Place endpoints, same-node endpoints, and unsupported endpoints.
- [ ] Prove at least one reference-supported station-to-station journey resolves to exactly one Uphill Transport segment with the correct Transport Type.
- [ ] Graph search still fails closed: no route edge is created from SVG proximity, display coordinates, or straight-line distance.
