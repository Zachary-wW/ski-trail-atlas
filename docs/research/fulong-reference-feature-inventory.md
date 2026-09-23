# Fulong high-resolution panorama feature inventory

Status: reviewed from the user-supplied 3631 × 2560 panorama for the layout-faithful redraw. The raster remains reference-only and is not a production asset.

## Published Trails

The publication boundary remains exactly 33 Trails. All 33 are reconstructed in the shared reference coordinate frame and remain searchable/clickable/routable only because they already exist in the Trail Catalog.

`A1 A2 A3 A5 A6 C3 D1 D2 B2 A9 A10 A7 A8 B9 B10 B11 C8 B6 B8 C1 C2 C7 C9 C10 B1 B3 B5 B7 B12 B13 B15 C5 C6`

## Supported uphill transport corridors

The current publication contains five major visible uphill corridors, reconstructed to the panorama layout:

- `L1` — central/east base to upper east sector.
- `L2` — terrain-park/base corridor.
- `L3` — west base to west upper station.
- `L5` — central base to summit ridge corridor.
- `L7` — east ridge / Urban airbus corridor.

Transport subtype and first-class top/bottom Route Endpoint semantics are intentionally deferred to the typed-transport tickets. Ticket 02 only preserves the visible corridor and endpoint topology already supported by publication.

## Reference-only map context

These labels/lines are visible on the panorama but are **not** silently added to the 33-Trail Catalog and are not route edges:

| Label | Classification | Public interaction |
| --- | --- | --- |
| C11 | planned map line | non-interactive context |
| C12 | planned map line | non-interactive context |
| C13 | map-only / unresolved publication identity | non-interactive context |
| E1 | planned map line | non-interactive context |
| B16 | referenced by panorama legend/MOGUL note but not in the 33-row published parameter boundary | unresolved; not drawn as routable Trail |

## Beginner transport / facility labels for later typed-transport work

The panorama visibly includes several magic-carpet facilities around the beginner area, including `F1/F2`, `F3`, `F5`, `F6`, `F8`, and `F9`. They are inventoried here but are not promoted to `Lift` records in Ticket 02 because the current domain model does not yet preserve typed Uphill Transport + Transport Station semantics. The later route-endpoint ticket must model them explicitly rather than guessing from their proximity to A1/A2/A3/A5/A6.

## Major Places / landmarks

Layout control and orientation use the visible Summit / Chongli Eye ridge, Fulong Base / Four Seasons service area, west L3 base, central L2/L5 base, terrain park, DJ square, beginner teaching area, and east/RV-camp sector. These are cartographic orientation references, not GPS coordinates.

## Sector-by-sector fidelity review

The completed redraw was reviewed against the same uploaded panorama at desktop map scale after the 33 Trail paths and five major uphill corridors were migrated into the reference coordinate frame.

| Sector | Reference cues checked | Result |
| --- | --- | --- |
| West / L3 | L3 base, L3 upper station, D1/D2 fan, C8/C9/C10 and planned C11/C12 corridor | no unexplained large-layout drift |
| Central / L2 + L5 | park runs A9/A10, A7/A8, L2 base corridor, L5 summit corridor, B11/B12/B13/B15 cluster | no unexplained large-layout drift |
| Summit / ridge | summit control anchor, C1/C2/C5/C6/C7 branches, upper B9/B10 relationship | no unexplained large-layout drift |
| East / L1 + L7 | L1 upper sector, B1/B2/B3/B5/B6/B7/B8 fan, L7 east ridge corridor | no unexplained large-layout drift |
| Beginner / base | A1/A2, A3/A5/A6 teaching area, Fulong Base and central service/base mass | no unexplained large-layout drift |

This review is cartographic, not survey-grade. The geometry remains `unverified` and the product continues to state that it is not for on-mountain navigation. Label anchors are allowed small offsets from the source label positions for legibility; the automated 1440px QC reports zero material Trail/Lift label overlap after those offsets.

## Fidelity boundary

Trail/transport geometry is redrawn from measured source-pixel paths into the shared 1000 × 650 SVG frame. Terrain masses, forest texture, buildings, typography, labels, and icons are independently redrawn. The source raster is never included in the Vite production bundle. Planned/map-only features remain visibly distinct and cannot create graph connectivity by SVG proximity.
