# 06: Release fidelity, interaction, and GitHub Pages QC

**What to build:** ship the layout-faithful Panorama, right inspector, and generalized Route Planner only after full reference-fidelity, interaction, accessibility, and deployment validation.

**Blocked by:** 02: Rebuild the full layout-faithful Fulong Panorama Map; 03: Restore a non-overlapping desktop right inspector; 05: Route Planner with grouped mountain endpoints.

**Status:** ready-for-agent

- [ ] Full side-by-side/overlay review against the uploaded panorama covers west L3, central L2/L5, east L1/L7, summit/ridge, beginner, and base sectors with no unexplained structural mismatch.
- [ ] Reference-calibration control anchors remain within the agreed tolerance and map label collision QC passes at desktop and mobile sizes.
- [ ] The production build contains no uploaded reference raster or copied decorative artwork unless rights have been explicitly confirmed.
- [ ] All 33 Published Trails remain searchable, clickable, and accessible by stable direct URL.
- [ ] Route regression covers Trail, Place, chairlift-station, gondola-station, and magic-carpet-station endpoint classes when those classes are supported by evidence; unknown types remain explicit rather than guessed.
- [ ] Desktop inspector never covers the map; mobile has no horizontal overflow and preserves controls → map → route → detail ordering.
- [ ] Readability, contrast, focus, reduced-motion, bilingual parity, evidence disclosures, and non-navigation disclaimers pass browser review.
- [ ] Typecheck, content tests, routing tests, full browser E2E, production build, and diff checks pass.
- [ ] GitHub Pages deploys successfully and live smoke tests confirm deep links, map interactions, endpoint routing, language switching, and 390px mobile behavior.
