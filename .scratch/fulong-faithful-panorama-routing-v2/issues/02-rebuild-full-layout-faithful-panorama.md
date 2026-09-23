# 02: Rebuild the full layout-faithful Fulong Panorama Map

**What to build:** replace the current schematic mountain geometry with an original interactive redraw that preserves the uploaded panorama's spatial layout for all supported Trails, Uphill Transports, Transport Stations, junctions, Places, and contextual reference features.

**Blocked by:** 01: Calibrate the high-resolution Fulong reference layout.

**Status:** ready-for-agent

- [ ] Inventory every relevant Trail/transport/major-place label reviewed from the high-resolution panorama and classify it as Published Trail, Uphill Transport, Transport Station/Place, Map Reference Feature, or unresolved.
- [ ] Preserve the existing 33 Published Trail Catalog boundary; map-only/planned/unresolved labels do not silently become searchable or routable Trails.
- [ ] Reconstruct all 33 published Trail geometries in the reference coordinate frame with recognizable shapes and relative positions across the west L3, central L2/L5, east L1/L7, summit/ridge, beginner, and base sectors.
- [ ] Reconstruct supported Uphill Transport lines and distinct top/bottom Transport Stations at reference-faithful relative positions.
- [ ] Preserve supported Trail junctions and branch/merge relationships from the reference rather than inferring connectivity from SVG proximity.
- [ ] Redraw terrain, trees, buildings, station/facility icons, and typography as original artwork; do not ship or filter the uploaded raster in production.
- [ ] Keep all 33 published Trails clickable/searchable/direct-linkable and retain selection highlighting, zoom/pan, keyboard operation, and auto-focus.
- [ ] During review, compare the full map against the uploaded panorama sector-by-sector using the calibration workflow and record zero unexplained large-layout drift.
