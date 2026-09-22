# Fulong Trail Intelligence

**Status:** ready-for-agent

## Problem Statement

Chinese-speaking skiers cannot easily look up a specific Fulong trail and understand its slope, difficulty, location, videos, and evidence in one place. Available information is distributed across official WeChat notices, static panorama images, government or tourism pages, commercial aggregators, map archives, and user videos. These sources use different seasons and inventory scopes, may conflict, and rarely provide an interactive mobile-friendly experience.

## Solution

Build a web-first Fulong Trail Catalog centered on an original interactive Panorama Map. A skier can search for a Trail by name or code, select it from the catalog or map, inspect source-reported attributes and curated videos, understand missing or conflicting information, and share a direct link to that Trail.

The first release covers Fulong only while keeping the domain model and routes ready for additional Resorts. It publishes a structurally accurate, non-navigational Panorama Map and evidence-backed Trail information. It does not claim real-time operating status, survey-grade coordinates, or computed slope metrics.

## User Stories

1. As a skier, I want to search by Trail name, so that I can quickly find the run I heard about.
2. As a skier, I want to search by Trail code, so that I can match signs and external material.
3. As a skier, I want to browse the complete known Trail Catalog, so that I can discover trails without knowing their names.
4. As a skier, I want to select a Trail from the Panorama Map, so that I can understand where it sits in the Resort.
5. As a skier, I want a selected Trail to be highlighted, so that I can distinguish it from nearby trails.
6. As a skier, I want map and catalog selection to stay synchronized, so that I can switch between spatial and textual exploration.
7. As a skier, I want to zoom and pan the Panorama Map, so that dense Trail labels remain readable.
8. As a mobile visitor, I want search and catalog access before the full map, so that I can look up a Trail on a small screen.
9. As a desktop visitor, I want the catalog, map, and selected Trail details visible together, so that comparison requires fewer navigation steps.
10. As a skier, I want a direct URL for a Trail, so that I can bookmark or share it.
11. As a skier, I want to see the Resort-reported difficulty, so that I understand how the Resort classifies the Trail.
12. As a skier, I want to see source-reported slope values, so that I can assess the Trail without fabricated calculations.
13. As a skier, I want to see length, width, and elevation when available, so that I have useful physical context.
14. As a skier, I want missing values shown explicitly, so that absence is not mistaken for zero.
15. As a skier, I want to filter for Trails with slope data, so that I can focus on comparable records.
16. As a skier, I want unresolved source conflicts to remain visible, so that I am not given arbitrary precision.
17. As a skier, I want to see the applicable Season and last verification date, so that I know how current the information is.
18. As a skier, I want to open the source behind a Published Field, so that I can inspect the evidence myself.
19. As a skier, I want to know when a Trail is Unlocated, so that I do not mistake a guessed position for verified topology.
20. As a skier, I want to see curated Trail-specific videos, so that I can understand the real skiing experience.
21. As a skier, I want zone-level and Resort-level videos labelled separately, so that weaker matches are not presented as exact.
22. As a content maintainer, I want invalid or duplicate Trail data to fail validation, so that broken content cannot silently ship.
23. As a content maintainer, I want a Trail to remain valid when optional attributes are missing, so that research can progress incrementally.
24. As a content maintainer, I want daily opening notices represented separately from the Trail Catalog, so that operational changes do not rewrite permanent inventory.
25. As a content maintainer, I want every map path linked to a Trail and topology evidence, so that the Panorama Map remains auditable.
26. As a keyboard user, I want to search, select, and inspect Trails without a pointer, so that the site is operable accessibly.
27. As a touch user, I want generous hit targets, so that narrow Trail paths can be selected reliably.
28. As a cautious visitor, I want a visible non-navigation disclaimer, so that I do not use the Panorama Map as an on-mountain safety tool.

## Implementation Decisions

- Use React, TypeScript, and Vite for the static web application.
- Model Resorts even though the first release contains only Fulong.
- Use versioned static content validated at build time; no database, account system, or administration backend is required.
- Keep Source Snapshots and Claims separate from browser-safe publication data.
- Treat missing, conflicting, stale, unverified, verified, and link-only as explicit states rather than prose conventions.
- A Trail may be published without slope data, video, or a Trail Location when it has a stable identity and at least one traceable source.
- Display source-reported slope values only. Do not compute average slope, maximum slope, a steepest sustained segment, or a slope profile in this release.
- Build the Panorama Map as original SVG artwork with independently addressable Trail paths, lift layers, labels, and interaction hit areas.
- Use official Resort material to establish names and current-season changes. Use government, institutional, specialist, open-data, and community sources for corroboration according to the documented source hierarchy.
- Do not distribute source raster maps or recognizable copied artwork without explicit permission.
- A Trail path requires topology evidence. Trails without sufficient evidence remain Unlocated and searchable.
- The Panorama Map guarantees structural relationships and relative position only; it is not a navigation map and does not promise geographic scale or coordinates.
- Keep the season-aware Trail Catalog separate from dated Operating Snapshots.
- Do not promise real-time opening status. Link to official notices and state that on-the-day operations must be confirmed with the Resort.
- Represent videos as manually reviewed metadata and outbound links. Classify each Video Match as Trail-specific, zone-level, or Resort-level.
- Do not download, mirror, scrape, or automatically match third-party videos in the first release.
- Make desktop presentation map-forward with catalog and details visible alongside it.
- Make mobile presentation query-forward with search and catalog before the full map.
- Give every Trail a stable direct route under its Resort.
- Start with one Trail end to end, then five representative Trails, before expanding the full Trail Catalog.

## Testing Decisions

- Test external behavior rather than React component internals.
- Use the content build boundary to verify schema rules, uniqueness, source requirements, explicit uncertainty states, and browser-safe output.
- Treat missing optional attributes and an Unlocated Trail as valid inputs.
- Treat duplicate identifiers, invalid states, missing required provenance, and unsafe publication data as build failures.
- Use browser-level tests as the primary product seam.
- Verify search, catalog selection, map selection, detail rendering, filtering, and direct Trail routes through the running application.
- Run the core browsing journey at desktop and mobile viewport sizes.
- Verify keyboard operation, visible focus, reduced-motion behavior, touch-sized interaction targets, and absence of horizontal overflow.
- Use a small evidence-backed Fulong fixture for early tests; expand the same public behavior tests as the catalog grows.
- There is no existing application test prior art in this repository.

## Out of Scope

- Additional Resorts beyond Fulong.
- A Resort comparison homepage for the first release.
- Real-time Trail and lift operating status.
- User accounts, saved lists, reviews, comments, and personalization.
- Skill-level recommendations or a questionnaire.
- Ticket-price comparison, resale listings, booking, and payments.
- Mini-program or native mobile applications.
- A database or editorial administration interface.
- Automated scraping of login-protected or private platform content.
- Video downloading, mirroring, or automated Trail matching.
- Navigation-grade GPS geometry.
- Computed slope metrics, elevation profiles, and DEM processing.
- Planning mode and itinerary building.

## Further Notes

- The current repository is a greenfield rebuild; implementation claims from the deleted repository are historical only.
- The source research records the current evidence hierarchy, conflicting inventory counts, copyright boundary, and map feasibility gate.
- The first publishable Panorama Map must display its Season, verification date, and non-navigation disclaimer.
- Public Trail count must identify its scope rather than collapsing planned, built, named, and operating Trails into one number.
