# Fulong high-resolution reference calibration

Status: development reference for the layout-faithful Panorama Map. The raster itself is **reference-only** and must not be added to the production bundle or committed unless reuse rights are explicitly confirmed.

## Reference observed

The user-supplied panorama is 3631 × 2560 px. The ski-map artwork occupies an approximately 3480 × 1740 px crop beginning at source pixel `(80, 65)`; the legend below that crop is excluded from the map coordinate frame.

The public SVG keeps its existing 1000 × 650 interaction viewport during the migration, but the layout-faithful source artwork maps into the inner bounds `(0, 75) → (1000, 575)`. This preserves the source map's ~2:1 aspect ratio without distorting it to the outer UI viewport.

Measured control anchors from the uploaded panorama:

| Control landmark | Source pixel | Normalized reference position |
| --- | ---: | ---: |
| Summit | (1970, 180) | (0.543, 0.066) |
| Fulong Base | (2241, 1351) | (0.621, 0.739) |
| L3 Base / west sector | (431, 1266) | (0.101, 0.690) |
| L3 Top | (1455, 410) | (0.395, 0.198) |
| C8 lower junction | (1691, 575) | (0.463, 0.293) |
| Central L2 / L5 base area | (1886, 1304) | (0.519, 0.712) |
| L7 east sector | (3389, 590) | (0.951, 0.302) |

These are **relative cartographic measurements**, not GPS coordinates. The content test keeps publication anchors within a small tolerance of these independently measured normalized positions.

## Tracer slice

Ticket 01 calibrates C8 and L3 first. They meet at the L3 top station / `ridge-west-high` control node in the reference. C8 remains clickable and focusable through the existing stable Trail URL while L3 remains an evidence-backed uphill line. All other Trail/Lift geometry is explicitly still `legacy-schematic` until the full migration ticket.

## Development-only side-by-side workflow

The current Runner cannot import the conversation raster because the host file bridge requires a trusted OAuth MCP client. Do not work around this by committing the image.

On a developer machine that has the same uploaded raster:

1. Save it to `artifacts/reference/fulong-highres.webp` (the whole `artifacts/` directory is gitignored), or set `FULONG_REFERENCE_IMAGE` to another local path.
2. Start the app: `npm run dev -- --host 127.0.0.1`.
3. Start the calibration helper: `npm run calibrate:fulong`.
4. Open `http://127.0.0.1:4174`.
5. Compare the cropped reference + red control anchors on the left with the live app on the right. The reference raster is served only by the local calibration process and is not imported by Vite.

Use `FULONG_APP_URL` or `FULONG_CALIBRATION_PORT` to override the defaults. `npm run calibrate:fulong -- --help` prints the workflow without requiring the raster.

## Copyright boundary

The source panorama is used to preserve functional spatial layout: relative Trail shapes, transport corridors, stations, junctions, and major landmarks. Terrain painting, trees, buildings, facility icons, logos, labels, typography, textures, and other decorative artwork must be redrawn independently. The final public asset is an original Panorama Map and retains the non-navigation disclaimer.
