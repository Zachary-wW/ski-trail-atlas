# Fulong atlas acceptance contract

Updated: 2026-09-29. Applies to M1 map acceptance and later content/routing work.
The active product sequence is [M0–M5](MILESTONES.md); M0 is the Chongli portal.
This contract replaces the former Fulong-only execution plan.

## Scope and meaning of fidelity

Reproduce the accepted reference's relative mountain layout, trail shapes,
forks, merges, transport corridors, stations and key facilities. Account for
all reference information, not just trail centerlines. Create original decorative
artwork; preserve evidence-backed structure instead of rearranging
it for aesthetics. “1:1” is not survey accuracy or permission to redistribute
the supplied image.

Search, map selection and basic information must resolve to stable identities.
Trails need evidence-backed difficulty colors with textual labels and a legend.
Unknown or conflicting difficulty must remain explicit; source/review colors
alone do not establish verified difficulty.

## Existing structural evidence

The [named baseline](baselines/fulong-structural-2026-09-28.md) identifies commit
`d8d9868` and the initial five-trail migration table. It is a documented
reference revision, not a Git tag or complete map acceptance.

The candidate has 65 visual segments, 35 trail-code groups, 3 reference
features and 9 transports; 51 segments are excluded from candidate routing.
Production linework and the local workbench share candidate geometry. The
workbench additionally uses the private 3631 × 2560 WEBP in source coordinates.

Retain the [chronological correction record](trace-pilot-review.md), including:
C5/C7; the A7/A8 fork and building gap from B11; B11/B13/B15 bends; the C1
restaurant corridor below E1; L3/L5/L7 summit convergence; L5 intermediate
alighting station; stroke widths and see-through rendering. Later geometry
changes require source/review rationale and focused regressions.

## Sector acceptance

For full-map, summit, central/park, west, east and beginner views:

1. Compare the exact source and linework in the same coordinate system.
2. Inventory every trail label, connector, transport, station and key facility.
3. Record missing, ambiguous, planned and user-reported items rather than
   silently omitting them or converting them into verified facts.
4. Review curves, forks, endpoints, label placement and difficulty legend.
5. Record reviewer, date, reference version, result and unresolved exceptions.

All sectors need user acceptance before M1 is complete. Earlier approval to
continue development is not complete sector-by-sector acceptance.
See [calibration](research/fulong-reference-calibration.md) and
[inventory boundaries](research/fulong-reference-feature-inventory.md).

## Content and routing boundaries

- The legacy 33-record parameter catalog is not the full-map inventory limit.
- Keep Resort, Trail, Trail Location, Map Node, Uphill Transport, Transport
  Station, Source Snapshot, Claim, Video Match and Operating Snapshot distinct.
- Published attributes retain source, season and verification state. Do not
  derive descriptive facts, difficulty or current operations from geometry.
- Start later content migration with B10/B11/B12/B13/B15; then expand by reviewed
  batches. A trail may have multiple separately identified locations.
- Map selection, detail and direct URLs resolve to the same Trail identity.
  Video states distinguish trail, zone, resort and missing evidence.
- Only reviewed directed edges enter published routing. Shared endpoints,
  visual intersections and proximity do not establish direction or access.
- Render unknown transport subtypes, endpoints, boarding permissions and
  ground exits honestly. Highlight only the segments in a supported Route Plan.
- Return an explicit no-route state when evidence is insufficient. Neither a
  map nor a Route Plan asserts live opening, safety or on-mountain navigation.

## Publication and regression gates

The local high-resolution source and user annotations remain gitignored,
development-only references until separate distribution permission is resolved.
The legacy public JPG has a separate unresolved publication-policy boundary;
its presence does not authorize publishing the newer WEBP.

Relevant code changes require typecheck, content tests, browser checks, build
and production Pages checks from the package scripts, plus a clean diff check.
Preserve the historical geometry regressions while deliberately updating root
page expectations for M0. Passing tests establishes regression behavior, not
source fidelity, travel permission or operating status.
