# 04: Ship the map-first global atlas safely

**What to build:** Close the redesign with accessibility, responsive, visual-overlap, regression, build, and GitHub Pages verification for the global Panorama Map and Route Planner.

**Blocked by:** 03: Plan schematic routes between Trails.

**Status:** completed

- [x] Full content, TypeScript, browser, and production-build suites pass.
- [x] Desktop and mobile visual checks show no persistent UI surface obscuring mapped Trail geometry.
- [x] Search results, bottom details, route controls, and route steps use readable contrast and font sizes.
- [x] Stable direct Trail URLs, bilingual switching, evidence links, non-navigation copy, and map zoom/pan all regress green.
- [x] The coherent feature commits are pushed to main and GitHub Pages deploys successfully.
- [x] The deployed site is smoke-tested for the global Trail map, Trail selection, route planning, and 390px overflow.

## Comments

Release QC adds keyboard skip navigation, a single top-level page heading, stronger focus-visible states, a theme color, and a 12px-or-larger floor for core search/detail/route metadata. Automated browser coverage traverses all 33 published Trails through search and stable direct URLs. Measured core text contrast is 5.21:1–7.08:1, desktop/wide/mobile map labels have zero detected overlaps, persistent detail and Route Plan surfaces remain below the map, and the 390px layout has no horizontal overflow. Final validation: 26 content tests, 22 browser tests, TypeScript, production build, and diff check all pass.
