---
status: accepted
---

# Validate source-native segments before restyling or expanding the map

The 2026-09-24 user request confirms that the supplied high-resolution panorama
is the functional layout authority. The pilot stores original image coordinates
and uses the same segments for visible linework, interaction and candidate
routing. Shared endpoints express deliberately annotated connections; proximity
alone does not connect two lines.

This supersedes the previous calibration implementation and the legacy
raster-plus-independent-rough-overlay approach as the forward plan. ADR 0003's
layout-preservation objective remains, while the exact supplied WEBP is now
available as a local fixture. Production appearance may change after structural
acceptance. Local access to the source is not taken as permission to publish it.

The cost is explicit map annotation and manual review before further features.
The benefit is that restyling no longer creates a different mountain, and route
geometry cannot silently diverge from its own segment graph. The reference
comparison controls remain development-only, while the original linework now
powers the structural MVP at the Pages root. It remains unverified for live
operating status and directed route publication; it does not publish the source
raster.

On 2026-09-24 the user accepted the corrected east visual baseline and authorized
full-map continuation. The full-map prototype preserves those paths and adds
native-coordinate candidates in other sectors, all excluded from routing.
This advances the visual-review scope, not production or direction verification.
