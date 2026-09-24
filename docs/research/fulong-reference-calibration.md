# Fulong reference and calibration contract

Updated: 2026-09-24. Status: east visual baseline accepted; full-map review pending.

## Source identity

- User-supplied filename: `179014500200932.WEBP`.
- Dimensions: **3631 × 2560**, WebP.
- SHA-256: `550e0e8c1d63f68d8b0d8b8ea0b91986926af931b0c1f9c6456f9f72cef06198`.
- Local fixture: `artifacts/reference/fulong-highres.webp` (gitignored).
- This is distinct from the legacy `public/maps/fulong-reference.jpg`
  (2000 × 1379). Do not substitute one for the other.

## One coordinate system

The pilot stores coordinates directly in original image pixels. The image is
rendered at `(0, 0, 3631, 2560)` inside the same SVG as the traced paths.
Frames are defined in `src/map/prototype/fulong-trace-data.ts`:

| View | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Full map | 80 | 65 | 3480 | 1740 |
| Summit | 1390 | 150 | 1150 | 610 |
| Central / park | 1300 | 500 | 1150 | 860 |
| West L3 | 340 | 370 | 1480 | 1020 |
| East B | 1920 | 350 | 1210 | 1030 |
| Beginner | 1900 | 1020 | 1050 | 350 |

Zoom and pan change only the viewBox, never the source or geometry transform.

Segment endpoints are references to shared nodes. The same segment path is
used for linework, selection, click targets, and route highlighting.
Coordinates and connections remain candidate annotations, not verified facts.
The user's 2026-09-24 corrections authorize shared-node joins across gaps in the
historical image. The source raster remains unchanged; current local status
overrides (C11/C12 and F8/F9) are labeled as user reports in the prototype.

## Local review

1. Place the exact WEBP at the fixture path above.
2. Run `npm run dev:trace` with Node.js 24.
3. Open `http://127.0.0.1:4173/?prototype=fulong-trace`.
   The old `?prototype=east-trace` alias defaults to the east sector.
4. Toggle reference / overlay / independent linework, adjust source opacity,
   and enable node markers. Hold the reference button for an instant comparison.
5. Inspect each trail's curves, forks, and endpoints at multiple zoom levels.
6. Demonstrate a candidate route and compare every highlighted segment with
   the route steps. Reversed or unannotated connections must not be invented.

The fixed `/__reference/fulong-highres.webp` endpoint exists only on the dev
server. It serves that one fixture, not arbitrary filesystem paths. Vite builds
exclude both the pilot import and the new high-resolution fixture.

## Review boundaries

- This prototype checks candidate centerlines and annotated connections, not
  final corridor widths, decorative artwork or live operating conditions.
  Full-map coverage remains subject to a completeness and identity review.
- B3's lower endpoint is kept separate from B1 until its connection is confirmed.
- Some centerlines are hidden by labels/icons and require review.
- Cable and magic-carpet corridors are contextual only; L7 extends to the image edge.
- New full-map segments are direction-pending and excluded from routing.
- Unnumbered connectors are separate segments, not silently assigned to a trail.
- A no-route result means the pilot lacks an annotated path, not that the actual
  resort is inaccessible.

The former side-by-side calibration server and its manually scaled crop were
retired in favor of the shared-coordinate overlay. Old claims that all 33 trails
were calibrated are not accepted as proof of fidelity.
