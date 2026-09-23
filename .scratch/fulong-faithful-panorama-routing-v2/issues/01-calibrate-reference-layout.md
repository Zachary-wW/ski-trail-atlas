# 01: Calibrate the high-resolution Fulong reference layout

**What to build:** establish a development calibration workflow and one end-to-end interactive map slice in the same spatial frame as the uploaded high-resolution Fulong panorama, so future geometry is anchored to the real reference layout instead of the current schematic composition.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] Define one reference coordinate frame derived from the uploaded panorama and use it for map geometry rather than the current abstract west/center/east layout.
- [x] Establish a development-only overlay or equivalent side-by-side calibration workflow against the uploaded panorama; the raster is not included in the production bundle or committed unless rights are explicitly confirmed.
- [x] Calibrate cross-mountain control landmarks including at least Summit, Fulong Base, L3 base/west sector, central L2/L5 base area, and L7/east sector.
- [x] Render at least one published Trail plus its connected Uphill Transport/Stations on the new coordinate frame, preserving click, focus, stable URL, evidence state, and keyboard interaction.
- [x] Add a reference-fidelity test/QC seam based on normalized control anchors so later edits can detect large layout drift without requiring the raster in production tests.
- [x] Demonstrate that decorative terrain/icons can be redrawn independently while functional positions remain aligned to the reference.
- [x] Existing public Pages behavior remains usable while this calibration slice is incomplete.
