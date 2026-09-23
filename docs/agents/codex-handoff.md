# Codex Handoff — Ski Trail Atlas

Last updated: 2026-09-23

## Repository state

- Repository: `https://github.com/Zachary-wW/ski-trail-atlas`
- Branch: `main`
- Current handoff commit before this document: `3373b95 fix: align Fulong panorama to source layout`
- Live site: `https://zachary-ww.github.io/ski-trail-atlas/`
- Stack: React 19 + TypeScript + Vite + vanilla CSS, Node.js 24
- The website defaults to English and can switch to Simplified Chinese. README follows the same English-default / Chinese-companion pattern.

## Product north star

Build an evidence-first, map-first ski trail atlas. Fulong Ski Resort is the first resort, but the model should remain extensible to other resorts.

The selected design direction is **E structure + A visual language** from the design exploration:

- map dominates the page;
- compact controls and search stay out of the way;
- desktop uses a dedicated right-side inspector rather than an overlay that blocks the map;
- mobile is query-first and stacks map → route → detail;
- visual language is editorial, alpine, restrained, and precise rather than dashboard-like;
- use typography, whitespace, hairline rules, and semantic trail colors instead of excessive cards, rounded pills, or decorative gradients.

See `.better-web-ui.md`, `docs/research/frontend-design-and-map-redesign.md`, and `prototypes/design-directions/` for the design exploration and prototypes.

## Current panorama decision

The user explicitly rejected a loose schematic redraw because it diverged too much from the high-resolution Fulong panorama.

Current implementation therefore treats the source panorama as **visual layout truth** and places a separate SVG interaction layer on top:

1. source panorama owns the visible mountain/trail layout;
2. SVG paths provide hit targets, hover, selection, and route highlighting;
3. default SVG trail/transport strokes are hidden or very light so they do not visually contradict the source map;
4. selected/route paths use broad semi-transparent highlights, not fake survey-grade centerlines;
5. auto-focus centers around source-aligned trail label positions instead of rough path bounding boxes;
6. all interactive geometry remains explicitly non-GPS, non-survey-grade, and evidence-state aware.

Current published raster: `public/maps/fulong-reference.jpg` (2000×1379). A higher-resolution 3631×2560 image was supplied in the prior ChatGPT session, but that exact high-resolution file is **not** currently committed. If higher zoom clarity is required, replace the reference raster while preserving the same layout/crop contract.

## Map fidelity work already done

The map-fidelity correction after Ticket 04 specifically recalibrated:

- West / L3 area: C3, D1, D2, C7, C9, C10 and related topology;
- Central area: B9, B10, B11, C1, C2, C5 and central control nodes;
- East / L1 + L7 area: B1, B2, B3, B5, B6, B7, B8 plus L1/L7 geometry and east control nodes;
- selected-trail focus and visible-label overlap behavior.

Important topology corrections include:

- C3 now belongs to the west/L3 network and terminates at West Base rather than Fulong Base;
- C7 descends from Summit to the L3-top/ridge-west-high node;
- C9 continues from ridge-west-high toward west-upper;
- C1 and C2 converge on the calibrated center-high node;
- C5 terminates at center-upper.

Do not derive routing edges from SVG distance or visual proximity. Routing must use publication topology only.

## Domain model decisions

The route model is no longer Trail-only.

`Route Endpoint` supports:

- Trail
- Transport Station
- Place

`Uphill Transport` is distinct from its stations and has a typed mode:

- `chairlift`
- `gondola`
- `magic_carpet`
- `unknown`

Transport endpoints must resolve to specific stations such as `L5 Bottom` / `L5 Top`; ambiguous `L5` itself is not a route endpoint.

Current evidence-backed transport typing includes L5/L3 as gondola and L2 as chairlift. Uncertain systems remain `unknown` instead of being guessed.

See:

- `CONTEXT.md`
- `docs/adr/0001-claims-first-publication.md`
- `docs/adr/0002-schematic-routing-over-topology.md`
- `docs/adr/0003-layout-faithful-original-panorama.md`
- `docs/adr/0004-route-endpoints-and-typed-uphill-transport.md`

## Specs and ticket history

Primary current spec:

`/.scratch/fulong-faithful-panorama-routing-v2/spec.md`

Tickets:

1. `01-calibrate-reference-layout.md` — completed
2. `02-rebuild-full-layout-faithful-panorama.md` — completed
3. `03-desktop-right-inspector.md` — completed
4. `04-generalize-route-endpoints-and-uphill-transport.md` — implemented and committed as `48625f2`
5. `05-route-planner-grouped-endpoints.md` — **next planned feature, not yet implemented**
6. `06-release-fidelity-and-pages.md` — follows the grouped-endpoint UI and final fidelity work

After Ticket 04, a separate Map Fidelity Correction was performed and committed as `3373b95` because the user still found the panorama visually inconsistent with the uploaded high-resolution map.

Before starting Ticket 05, visually inspect the current live panorama with the user. If fidelity is still materially wrong, continue map fidelity correction first. The user considers map fidelity a higher priority than route-planner UI expansion.

## Current UI constraints

- Desktop search should stay compact; do not restore the old large left sidebar.
- Panorama Map is the dominant surface.
- Desktop Trail Detail / Route Plan belong in the right inspector column and must never cover the map.
- Mobile remains query-first with no horizontal overflow.
- Clicking a trail should naturally focus it without losing surrounding spatial context.
- Route planning must eventually let users start/end at mountain places or transport stations, not only trails.
- Trail and Uphill Transport must remain separate concepts in UI and data.

## Evidence and publication boundary

- Source-reported trail parameters are published; missing values stay missing.
- Do not infer average/max slope, elevation profile, DEM values, or live operating status.
- Do not create topology because two SVG paths look visually close.
- Conflicting trail counts from different sources must remain explicit rather than collapsed into one claimed total.
- Map-only / planned reference features must not automatically become searchable Published Trails.
- Panorama and route planning are not navigation or safety guidance.

Useful research:

- `docs/research/fulong-map-sources.md`
- `docs/research/fulong-reference-calibration.md`
- `docs/research/fulong-reference-feature-inventory.md`
- `docs/research/frontend-design-and-map-redesign.md`

## Validation baseline

Use Node.js 24. The latest map-fidelity release passed:

- TypeScript typecheck
- 36 content tests
- 26 Playwright E2E tests
- Vite production build
- `git diff --check`
- GitHub Pages build/deploy
- live browser smoke for reference raster, B1 selection/highlight, B1→D1 route, and 390px no-overflow

Typical commands on this machine:

```bash
npx -y node@24 node_modules/typescript/bin/tsc --noEmit
npx -y node@24 node_modules/vitest/vitest.mjs run
npx -y node@24 node_modules/@playwright/test/cli.js test
npx -y node@24 node_modules/vite/bin/vite.js build
```

## Local skills

This checkout currently has project-local skills under `.agents/skills/`, including Ask Matt workflow skills (`ask-matt`, `grill-with-docs`, `domain-modeling`, `to-spec`, `to-tickets`, `implement`, `tdd`, `code-review`, `research`) plus frontend-design skills.

`.agents/` is intentionally **not committed** in this handoff because these are third-party skill files and their redistribution/license boundary has not been reviewed. Codex running in this same checkout can use them locally. A fresh clone will not receive them unless they are reinstalled or their licensing is reviewed and they are deliberately added later.

## Suggested next Codex prompt

> Read `docs/agents/codex-handoff.md`, `CONTEXT.md`, `.scratch/fulong-faithful-panorama-routing-v2/spec.md`, ADR 0003/0004, and the current Ticket 05. First inspect the live/current panorama against the reference map and do not proceed to Ticket 05 if map fidelity is still materially wrong. Preserve the source-raster-as-visual-truth approach, right-side desktop inspector, English-default bilingual UI, and evidence-first routing/domain boundaries. Use `/implement` + TDD + code review for the next ticket and push only after full validation.
