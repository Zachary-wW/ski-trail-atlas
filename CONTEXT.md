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
An original, structurally accurate illustration of a Resort showing relative Trail and lift relationships. It is not a navigation map and does not claim survey-grade scale or coordinates.
_Avoid_: Official map, navigation map

**Trail Location**:
The verified relative position and connections of a Trail on a Panorama Map. A Trail without sufficient topology evidence is Unlocated.
_Avoid_: GPS track, exact route

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
