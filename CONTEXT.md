# Ski Resort Intelligence

This context describes the evidence-backed ski resort and trail information presented to people researching a ski trip.

## Resort and trail catalog

**Resort**:
A managed ski area that owns a trail inventory, lift system, and season-specific public information.
_Avoid_: Snow field, scenic area

**Trail**:
A named or coded ski run belonging to a Resort. A Trail may be catalogued even when some attributes or its location are unknown.
_Avoid_: Route, piste, slope

**Trail Catalog**:
The season-aware collection of Trails known to the product. Its size does not imply that every Trail is built, open, located, or verified.
_Avoid_: Open trail list, canonical trail count

**Panorama Map**:
An original Resort illustration whose spatial layout preserves source-backed relative positions, Trail shapes, transport lines, stations, junctions, and major landmarks from an accepted reference layout. Decorative terrain, trees, buildings, icons, and typography may be redrawn, but the map must not invent a new mountain layout. It is not a navigation map and does not claim survey-grade scale or coordinates.
_Avoid_: Official map, navigation map, approximate topology sketch

**Trail Location**:
The evidence-backed relative position and connections of a Trail on a Panorama Map, together with its Verification State. A Trail without sufficient topology evidence is Unlocated.
_Avoid_: GPS track, exact route

**Map Node**:
A source-backed relative connection point on a Panorama Map, such as a Transport Station, Trail junction, Base, Summit, or zone anchor. A Map Node is topology, not a surveyed coordinate.
_Avoid_: GPS point, waypoint

**Uphill Transport**:
A source-backed uphill conveyance connecting two Transport Stations. Its Transport Type distinguishes chairlift, gondola, magic carpet, or an explicitly unknown type. Only transports with supported endpoints may participate in a Route Plan.
_Avoid_: Trail, Route, generic line

**Transport Station**:
A named or derived boarding/alighting endpoint of an Uphill Transport, bound to one Map Node. Top and bottom stations are distinct Route Endpoints even when they belong to the same transport.
_Avoid_: Lift, route, waypoint

**Place**:
A named, routeable Resort location that resolves to one Map Node without implying movement, such as Fulong Base, West Base, Summit, or a supported park/zone anchor.
_Avoid_: Trail, Transport Station

**Route Endpoint**:
A user-selectable start or destination for a Route Plan. A Route Endpoint may be a Trail, Transport Station, or Place and resolves to one or more precise graph nodes according to its endpoint semantics.
_Avoid_: free-form coordinate, GPS point

**Route Plan**:
A derived, ordered sequence of directed Trail and Uphill Transport segments connecting a chosen Route Endpoint to another Route Endpoint on the published topology graph. A Route Plan is schematic and season-aware; it does not assert live opening status, safety, travel time, or GPS navigation.
_Avoid_: navigation route, safest route, shortest-distance route

**Route Segment**:
One directed movement step inside a Route Plan. Trail segments travel downhill through the published topology; Uphill Transport segments travel uphill and retain their Transport Type so the UI can distinguish chairlift, gondola, and magic-carpet rides.
_Avoid_: GPS segment

**Map Reference Feature**:
A line, label, landmark, or facility visible in a reference panorama whose public identity or publication status is not sufficiently supported for the Trail Catalog or routing graph. It may be retained as non-interactive map context with an explicit state, but cannot silently become a Trail or route edge.
_Avoid_: Published Trail, confirmed Lift

**Season**:
The named snow season to which a Source Snapshot, Claim, Trail attribute, or Panorama Map applies.
_Avoid_: Current, latest

## Evidence and publication

**Source Snapshot**:
An immutable record of a source as observed at a particular time, including its publisher, date, Season, provenance, and permitted use.
_Avoid_: Source, scraped page

**Claim**:
One source's assertion about one Trail or Resort field. Conflicting Claims coexist until publication rules determine what can be shown.
_Avoid_: Fact, value

**Published Field**:
A user-visible value selected from one or more Claims together with its evidence and verification state.
_Avoid_: Canonical value, truth

**Verification State**:
The explicit condition of a Published Field or Trail Location: verified, unverified, missing, conflicting, stale, or link-only.
_Avoid_: Valid, invalid

**Operating Snapshot**:
A dated official notice describing which Trails and lifts are operating at a particular time. It does not redefine the Trail Catalog.
_Avoid_: Trail inventory, live status

## Video evidence

**Video Match**:
A manually reviewed relationship between a video and a Trail, zone, or Resort.
_Avoid_: Recommended video, related video

**Trail-specific Match**:
A Video Match that clearly depicts the named Trail.

**Zone-level Match**:
A Video Match that depicts the Trail's surrounding area but cannot be confirmed as specific to that Trail.

**Resort-level Match**:
A Video Match that depicts the Resort generally.
