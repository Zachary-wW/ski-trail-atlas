---
status: accepted
---

# Preserve the accepted reference layout while redrawing the public Panorama Map

Implementation update (2026-09-24): see [ADR 0005](0005-reference-native-segment-pilot.md).
The old raster-overlay implementation is not proof of compliance with this decision.

The public Panorama Map will use the user-supplied high-resolution Fulong panorama as the spatial layout authority for relative Trail shapes, transport lines, stations, junctions, and major landmarks. The implementation may establish a development-only calibration overlay against that raster, but the public site will not ship, filter, trace decorative artwork from, or otherwise reuse the source raster unless its rights are separately confirmed. Terrain, trees, buildings, icons, labels, and visual styling are redrawn as original artwork around the same relative layout. This deliberately favors recognizability to experienced Fulong skiers over the freedom to simplify the mountain into a new schematic composition; uncertainty remains explicit because the reference is still not survey-grade GPS data.
