# Frontend Design and Fulong Map Redesign Research

Research date: 2026-09-23

## Questions

1. Which Agent Skills are a better fit for redesigning Ski Trail Atlas into a high-quality, distinctive web product?
2. How should the Fulong Panorama Map be rebuilt so it reflects the real resort structure instead of a decorative schematic?

## Executive conclusion

The current product should be treated as a functional prototype, not a visual baseline. The next pass should **stop extending the current visual system** and instead establish a new art direction and a new topology model before further UI implementation.

For frontend design, the best core choice is a dedicated frontend-design skill rather than a chart skill. Recommended stack:

1. **Anthropic `frontend-design`** as the core art-direction / implementation skill.
2. **Vercel `web-design-guidelines`** as the post-build UX/accessibility review skill.
3. **Oil Motion** only after the static hierarchy and interaction model are correct.
4. Use **Lieflat Charts as visual reference**, especially its editorial typography, hairlines, spacing, annotations, and restrained color systems, rather than as the application shell.
5. Optionally use a UI-direction skill such as `better-web-ui/add-ui` when the goal is to generate and compare several distinct directions before committing to one.

For the map, the current five independent SVG curves are not sufficient. The source material shows Fulong as a connected **Trail + Lift + Junction + Base-area network**. The redesign should first reconstruct that network, then render it with original cartography.

---

## 1. Frontend skill research

### A. Anthropic `frontend-design` — recommended core

Source:
- https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md

Why it fits:
- explicitly targets distinctive, production-grade frontend interfaces;
- requires choosing a deliberate aesthetic direction before implementation;
- warns against generic templated / "AI" aesthetics;
- treats typography, spatial composition, color, and motion as first-class design decisions;
- is appropriate for reshaping an existing UI, not only producing isolated charts.

Recommended role in Ski Trail Atlas:
- redesign the complete shell and page hierarchy;
- establish an Alpine/editorial cartography visual language;
- build the map-forward desktop experience and query-first mobile experience.

### B. Vercel `web-design-guidelines` — recommended review gate

Source:
- https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
- https://github.com/vercel-labs/agent-skills

Why it fits:
- intended for UI, UX and accessibility review rather than visual generation;
- covers focus states, semantic HTML, keyboard interaction, forms, typography, animation, images and performance;
- useful after a high-fidelity visual pass, so polish does not regress accessibility or interaction quality.

Recommended role:
- run after each major visual implementation;
- treat it as a quality gate, not as the art director.

### C. Lieflat Charts — useful visual grammar, not the main app skill

Source:
- https://github.com/larashero3-dotcom/lieflat-charts
- https://github.com/larashero3-dotcom/lieflat-charts/blob/main/SKILL.md

Strengths relevant to this project:
- strong editorial hierarchy;
- disciplined whitespace and hairline rules;
- source / annotation treatment is excellent for an evidence-backed product;
- Mono / Porcelain / Palm / Wire palettes demonstrate restrained color systems;
- includes interactive network/path visualizations.

Why not use it as the whole product framework:
- its primary contract is data visualization and report generation;
- it is template-driven around chart/data shapes, not application information architecture;
- its repository uses the PolyForm Noncommercial License, so copying template implementation directly creates licensing constraints for a future commercial product.

Recommended role:
- use as aesthetic reference for evidence panels, metadata, legends, statistics, typography and map annotations;
- do not copy its report shell wholesale.

### D. Oil Motion — good second-pass interaction skill

Source:
- https://github.com/oil-oil/oil-motion
- https://github.com/oil-oil/oil-motion/blob/main/SKILL.md

Strengths:
- interaction-driven animation tied to scroll, mouse, drag and touch;
- explicit quality checks for reversing gestures, performance, responsive input mapping and reduced-motion fallback;
- MIT licensed.

Recommended role:
- selected Trail focus transitions;
- map-to-detail panel transitions;
- smooth zoom/focus when a user selects a Trail;
- hover / label reveals and mobile detail-sheet transitions.

Do **not** use it to compensate for weak information architecture or weak map geometry.

### E. `better-web-ui` — strong optional workflow for comparing directions

Source:
- https://github.com/aladicf/better-web-ui

Useful parts:
- `setup`: persist product-specific design context;
- `add-ui`: generate several distinct visual directions for the same product surface;
- `critique`: hierarchy / cognitive-load review;
- `audit`: measurable accessibility / responsive review;
- `animate`, `arrange`, `hierarchy`, `showcase`: focused refinement.

Why it is interesting here:
- the product needs a *direction choice*, not merely prettier CSS;
- `add-ui` explicitly supports redesigning an existing page and comparing multiple directions before applying one;
- supports React + Vite + vanilla CSS.

Caveat:
- repository is in maintenance mode, although it remains available and current; the author states active work has moved to a React/Shadcn/Tailwind variant.

### F. UI/UX Pro Max — useful catalog, lower priority

Source:
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

It provides a large searchable set of styles, palettes, font pairings, UX rules and motion presets. It is useful for exploration, but for this project I would prefer an opinionated art-direction skill (Anthropic frontend-design or better-web-ui) over a large style catalog because the current failure is lack of a coherent point of view, not lack of options.

---

## 2. Recommended visual direction

The new design should not look like a generic dashboard. The subject itself should drive the identity.

Working direction: **Alpine Editorial Cartography**.

Characteristics:
- the Panorama Map is the hero and primary interaction surface;
- typography feels closer to a high-end mountain guide / editorial atlas than a SaaS dashboard;
- off-white snow / paper surfaces, charcoal text, cold blue topology, and one high-visibility accent;
- thin cartographic hairlines and compact technical annotation;
- large negative space, but not at the expense of map density;
- detail cards feel like map annotations / field notes rather than dashboard cards;
- difficulty is encoded consistently on the map and in the catalog;
- evidence / season / verification appear as subtle but always-visible cartographic metadata;
- selected Trail gets a strong focus treatment while unrelated Trails fade rather than disappear.

A useful visual synthesis would borrow:
- Lieflat's editorial spacing / line-work / metadata discipline;
- a modern ski map's information density;
- Oil Motion only for restrained focus and map transitions.

---

## 3. Fulong source evidence available now

### Primary working topology reference: Chonglihuaxue

Trail data and panorama page:
- https://www.chonglihuaxue.cn/info.asp?id=167

The page currently exposes:
- 33 named Trails;
- difficulty grouping;
- length, average width, summit elevation and average slope where available;
- a Fulong panorama image;
- an explicit note that a high-resolution original can be requested via WeChat.

The image link exposed by the page currently resolves to:
- https://www.chonglihuaxue.cn/uploadfile/image/x/xdt/2000flqq.jpg

Important limitation:
- Chonglihuaxue is operated by Zhangjiakou Dihe Tourism, not by Fulong Resort itself. Treat it as a high-value commercial / resort-attributed reference, not as the Resort's own official publication.

### 2025–2026 opening-plan cross-check

- https://66ski.com/7/snowtrails.html

The displayed 2025–2026 opening-plan graphic shows 32 open Trails and a simplified Trail/Lift structure. It is useful for current-season topology cross-checking, but it is a dated operating/opening representation rather than a permanent Trail Catalog.

### Government / tourism corroboration

Beijing Culture and Tourism:
- https://www.visitbeijing.com.cn/article/4PGlJKDcIjF

It reports that Fulong has completed 39 Trails and describes 2025–2026 upgrades, including the L2 terrain-park area. This count must not be merged with the 33-row parameter table or the 32-Trail opening plan; they describe different scopes.

### Independent lift corroboration

Skiresort 2025/2026 trail map:
- https://www.skiresort.com/en/ski-resort/fulong/trail-map/

Lift inventory:
- https://www.skiresort.info/ski-resort/fulong/ski-lifts/

Useful individual lift records:
- L1: https://www.skiresort.info/ski-resort/fulong/ski-lifts/l105101/
- L3: https://www.skiresort.info/ski-resort/fulong/ski-lifts/l114185/
- L5: https://www.skiresort.info/ski-resort/fulong/ski-lifts/l114184/

Skiresort currently identifies 12 lifts / people movers and gives length / base / top elevation for major lifts. This is useful for checking the major lift skeleton independently of the panorama artwork.

### Historical / open-data reference

- Fulong Skimap archive: https://skimap.org/skiareas/view/13871
- OpenSkiMap description / data availability: https://wiki.openstreetmap.org/wiki/OpenSkiMap

These can help with historical comparison and geographic sanity checks. They should not override current-season Trail names or topology without corroboration.

---

## 4. What is wrong with the current Panorama Map

The Ticket 03 map proved interaction mechanics, but it should not be treated as usable cartography.

Main problems:

1. **No connected topology.** Five independent curves do not communicate junctions, shared starts/finishes, access, or how a skier moves through the resort.
2. **No lift skeleton.** The real Fulong map is organized around major lifts (notably L1/L2/L3/L5) and base-area access. Removing unsupported lifts was correct for evidence safety, but the next map needs to model them properly rather than omit the whole access system.
3. **No full mountain structure.** Fulong has recognizable left / central / right sectors and multiple upper-ridge / base connections. Current artwork has no meaningful correspondence to those sectors.
4. **Labels are decorative, not navigational.** Trail codes need placement at meaningful segments / junctions, not arbitrary midpoints.
5. **Selection does not help orientation enough.** A selected Trail should focus the view, retain nearby context, show lift access and important junctions, and dim unrelated content.
6. **The map is too sparse to answer the user question: "Where is this Trail and how does it relate to the mountain?"**

---

## 5. Proposed map data model

Do not model a Trail Location as a single opaque SVG path anymore.

Recommended concepts:

### `MapNode`
Represents a topology landmark:
- base station;
- lift top / bottom station;
- Trail junction;
- Trail split / merge;
- notable area / park entry.

Fields should include stable ID, map-space coordinate, evidence and verification state.

### `TrailSegment`
A Trail is composed of one or more segments between nodes.

Suggested fields:
- `id`;
- `trailId`;
- `fromNodeId`;
- `toNodeId`;
- original SVG geometry for that segment;
- difficulty;
- source Snapshot(s);
- verification state.

This allows shared junctions and partial uncertainty instead of one fake continuous line.

### `Lift`
Model L1/L2/L3/L5 and people movers independently from Trails.

Fields:
- lift ID / display code;
- type;
- bottom/top node;
- source evidence;
- season / verification state;
- display geometry.

### `Zone`
Optional grouping for orientation and responsive map labels, e.g. left mountain / central park / right advanced sector, but only after zones can be grounded in source structure.

### `MapFacility`
Only include facilities that materially help orientation (base village, main ski hall, parking / key entry). Do not reproduce every commercial icon from the source artwork.

---

## 6. Reconstruction workflow

### Phase A — evidence board, no frontend coding

1. Obtain the highest-resolution Fulong panorama available.
2. Preserve the source file privately as research evidence; do not commit it to the public product unless reuse permission is explicit.
3. Create a Trail / Lift / Junction comparison table from:
   - Chonglihuaxue panorama;
   - 2025–2026 opening plan;
   - Skiresort lift inventory and map;
   - official or resort-attributed notices where available.
4. Mark each topology statement as verified / unverified / conflicting / unlocated.

### Phase B — topology graph

1. Identify major lift stations first.
2. Identify shared Trail junctions / branch points.
3. Build the node-edge graph before drawing decorative terrain.
4. Validate that every Trail segment resolves to a Trail and every visible Lift resolves to a Lift record.

### Phase C — original map drawing

1. Draw a new mountain silhouette / terrain field that does not reproduce the source map artwork.
2. Place lift skeleton.
3. Place Trail segments according to topology graph.
4. Add labels, difficulty encoding and junction cues.
5. Only then add terrain texture / vegetation / base-area illustration.

### Phase D — interaction

Desktop:
- full-width / dominant map canvas;
- compact searchable Trail index as a rail or overlay;
- selected Trail detail appears as a floating field-note panel;
- selecting a Trail animates the camera to a useful bounding box, not an extreme zoom;
- unrelated Trails fade while adjacent junction context remains visible.

Mobile:
- search first;
- result/detail sheet can open over the map;
- map fills most of the viewport when exploring;
- touch target is much wider than visible Trail stroke;
- pinch / drag interaction should not fight page scrolling.

---

## 7. Hard problems / user help that would materially improve accuracy

### 1. High-resolution source map

This is the most valuable missing asset.

The Chonglihuaxue page explicitly says a high-resolution original can be requested via WeChat. The public preview is good enough to reconstruct the broad topology, but a high-resolution image would materially improve:
- exact branch / merge interpretation;
- label association;
- lift station placement;
- distinction between existing and planned Trails.

If the user can obtain that high-resolution source and upload it privately, we can use it as internal reference while still shipping only original artwork.

### 2. Current official Resort panorama

A current-season panorama directly from Fulong's official channel would allow promotion of more Trail Locations from `unverified` to `verified` when cross-checked with the independent sources.

### 3. Planned vs built vs open state

The product must keep these separate:
- planned / depicted Trail;
- built Trail;
- Trail in season-aware Catalog;
- Trail open on a specific date.

The public map should not use one styling system that accidentally implies all depicted Trails are currently open.

---

## 8. Recommended next step

Do **not** implement Ticket 04 on top of the current visual system yet.

Recommended sequence:

1. Install a small design-skill set rather than a large bundle.
2. Generate **3–5 distinct high-fidelity UI directions** for the same real Ski Trail Atlas screen before choosing one.
3. Pick one art direction and record it in a design brief / `DESIGN.md`.
4. Separately reconstruct the Fulong topology graph from source evidence.
5. Replace the current PanoramaMap only after the topology graph is reviewable.
6. Then run Vercel's design-guideline review and add motion as the final polish layer.

### Suggested minimal skill set

Core:
- Anthropic `frontend-design`
- Vercel `web-design-guidelines`

Optional design exploration:
- `better-web-ui`: `setup`, `add-ui`, `critique`, `audit`

Motion after direction is approved:
- `oil-motion`

Reference only:
- `lieflat-charts`

This keeps skill context focused and avoids having several overlapping frontend-design skills all attempting to lead the same task.
