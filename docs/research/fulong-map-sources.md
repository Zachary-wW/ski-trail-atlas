# Fulong Map Source Research

Research date: 2026-09-22

## Question

Can the project reconstruct an accurate, attractive, interactive Fulong Ski Resort panorama without receiving an official high-resolution map directly?

## Conclusion

Yes, but only as a **structurally accurate, non-navigational schematic map**.

The public evidence is sufficient to reconstruct trail names, difficulty classes, lift relationships, and much of the relative topology. It is not sufficient to claim survey-grade geometry, scale, coordinates, or complete current-season operational accuracy.

The final map must pass a trail-by-trail evidence review. A trail with unresolved position or connectivity remains unlocated instead of being guessed.

## Source hierarchy

### A — Resort-operated channels

Use these as the primary source for current-season names, openings, closures, lift operations, and changes.

- Current attribution found in syndicated material: **崇礼富龙四季小镇国际度假区**.
- Legacy official account name: **富龙滑雪山地度假区**.
- Resort operator named in a 2024-2025 season notice: **张家口富龙文化旅游有限公司**.

Current-season notices are commonly distributed through WeChat and then mirrored by other sites. For example, the 2025-11-01 opening notice lists the actual trails and lifts planned to open and credits the resort account as the source:

- [2025-10-30 opening notice mirror](https://www.sohu.com/a/949299039_121124404)
- [2024-11-09 opening notice mirror](https://www.sohu.com/a/825108557_678833)
- [Legacy official-account mirror](https://www.sohu.com/a/274354148_717123)

Mirrors are discovery aids, not substitutes for preserving the original WeChat article. When an original article is accessible, archive its URL, title, publication time, account name, screenshots, and map image separately.

### B — Government and institutional sources

Use these to corroborate resort identity, broad facility facts, and dated changes. They generally do not provide enough map detail for tracing individual trails.

- [Hebei Sports Bureau: 2024-2025 season opening](https://sport.hebei.gov.cn/faguichanye/cdcg/2024/1107/26506.html)
- [General Administration of Sport: Fulong resort report](https://www.sport.gov.cn/n20001280/n20745751/n20767239/c21682090/content.html)
- [Beijing Culture and Tourism article describing the 2025-2026 upgrade](https://www.visitbeijing.com.cn/article/4PGlJKDcIjF)

### C — Specialist and commercial map sources

Use these to compare topology and detect version differences. Do not promote their values to verified facts without corroboration.

- [Skiresort.com Fulong trail map, labelled 2025/2026](https://www.skiresort.com/en/ski-resort/fulong/trail-map/)
- [Skiresort.com lift inventory](https://www.skiresort.info/ski-resort/fulong/ski-lifts/)
- [Skimap.org Fulong archive, 2018 map](https://skimap.org/skiareas/view/13871)
- [Chonglihuaxue Fulong trail table and panorama](https://www.chonglihuaxue.cn/info.asp?id=167)

`chonglihuaxue.cn` is operated by Zhangjiakou Dihe Tourism, not by Fulong. Its page attributes the material to Fulong and exposes 33 named trail rows, but it remains a secondary commercial source.

### D — Open geographic data and community material

OpenStreetMap/OpenSkiMap may help georeference the resort, lifts, and any mapped pistes:

- [OpenSkiMap project description](https://wiki.openstreetmap.org/wiki/OpenSkiMap)
- [Mapcarta page backed by OpenStreetMap](https://mapcarta.com/W920010114)

Every OSM feature must retain its object ID, version, contributor license attribution, and retrieval date. User posts and videos are useful for visual cross-checking intersections, signs, and real-world appearance, but do not independently establish topology.

## Why published trail counts conflict

| Published count | Context | Interpretation |
|---:|---|---|
| 42 | Common resort/industry description | Often planned or total inventory |
| 37 | Resort-attributed 2023 description | Reported as built at that time |
| 39 | 2025 Beijing culture/tourism article | Reported completed trails |
| 33 | Chonglihuaxue named parameter table | Trails represented in that table |

These numbers should not be collapsed into one canonical count. They may describe planned, built, named, groomed, public, or currently operational trails. The product should publish an explicit inventory scope and season.

## Evidence model for the redraw

Each source image or notice becomes a `SourceSnapshot` with:

- source URL and publisher;
- original account/source attribution;
- published date and snow season;
- retrieval date and checksum;
- source class and confidence;
- permitted use: `reference_only`, `permission_granted`, or `open_license`.

Each trail-map assertion becomes a separate claim:

- trail name and code;
- difficulty;
- existence in a given season;
- connections and intersections;
- lift access;
- relative location;
- open/closed status for a specific date.

Do not let a daily opening notice overwrite the master inventory. It represents an operational snapshot, not the permanent trail catalogue.

## Recommended production workflow

1. Collect the latest accessible official WeChat panorama and several opening notices.
2. Preserve source metadata before interpreting the images.
3. Build a comparison matrix covering names, difficulty, lifts, junctions, and season.
4. Draw an original SVG terrain illustration.
5. Draw each trail as an independently addressable SVG path linked to the trail record.
6. Validate each path against the newest official image and at least one independent source where possible.
7. Mark unresolved trails as `unlocated`; never invent a route.
8. Publish the map as a non-navigational schematic with season and verification date.
9. Re-run the comparison when the resort publishes a new-season panorama.

## Copyright and publication boundary

Public availability does not imply permission to reproduce or adapt an image.

- Keep source maps as internal research evidence unless reuse rights are explicit.
- Do not ship the official raster image, extracted artwork, icons, typography, or decorative composition.
- The public product should contain original terrain art and original vector paths.
- Attribute factual and open-data sources separately from any map-image permission.
- Obtain written permission before retaining recognizable official artwork or distributing a traced derivative.

## Feasibility gate

The first production map is ready only when:

- every visible trail path has a trail ID;
- every trail path has at least one topology source;
- names, difficulty, and lift access carry season-aware claims;
- disputed connections are visibly unresolved;
- the map declares its season and verification date;
- the interface states that it is not for on-mountain navigation.

## Initial research limitation

During the 2026-09-22 research pass, the Chonglihuaxue map image returned a 502 error in the live browser and the Skiresort map page timed out. Search indexing confirmed that both map resources existed, but their full-resolution imagery was not available for visual, trail-by-trail inspection. That pass established the source and validation strategy but did not approve Fulong geometry.

## 2026-09-23 topology reconstruction follow-up

A second follow-up was able to fetch the Chonglihuaxue Fulong panorama resource directly from the research Runner as a **2000 × 1379 JPEG** and inspect the complete mountain structure. The 2025-2026 opening-plan schematic mirrored at 66ski remains a discovery/cross-check aid rather than publication evidence. This materially improves the structural reference compared with the original Ticket 03 pass, but it still does not establish survey-grade geometry or official current-season verification.

- A new `chonglihuaxue-map-2026-09-23` Source Snapshot records the map-specific retrieval used by the topology reconstruction.
- The publication boundary now models evidence-backed Map Nodes and Lifts in addition to Trail Locations. A Lift cannot publish unless its endpoint nodes and Source Snapshot exist.
- The first structural skeleton includes the four prominent lifts **L3, L2, L5, and L1**, plus lift stations, three junction anchors, the summit, park area, and Fulong base. All remain `unverified` relative topology.
- The five currently published Trail Locations (A1, D1, A7, B1, B13) were repositioned against this mountain skeleton instead of retaining the earlier parallel representative curves.
- The public SVG remains an original editorial redraw. The Chonglihuaxue raster, its icons, labels, decorative artwork, and typography are not shipped in the product.
- The redraw intentionally preserves only structural relationships that can be supported at this stage. It does not claim exact coordinates, scale, lift station survey positions, or safe ski navigation.
- Expanding from five interactive Trails to the full 33-row parameter inventory still requires Trail-by-Trail topology review and should not be inferred from background decoration.
