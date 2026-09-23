# Ski Trail Atlas

**English** | [简体中文](README.zh-CN.md)

An evidence-first interactive trail atlas for Fulong Ski Resort. The current release covers the 33 Trails listed by the active parameter source, supports search and stable direct links, and exposes source-reported difficulty, slope, length, width, elevation, verification state, and evidence.

The longer-term product is designed to expand beyond Fulong. The current fidelity mode keeps the published source panorama as the visual layout reference and layers evidence-backed SVG interaction, selection, and route geometry on top. Interactive geometry remains explicitly unverified and non-navigational; the panorama is reference evidence, not GPS or survey data.

## Live site

GitHub Pages: <https://zachary-ww.github.io/ski-trail-atlas/>

The website defaults to English and includes an in-page switch to Simplified Chinese. Source-native trail names and source titles remain in their original language.

## Current status

The current map-first release includes:

- 33 source-listed Fulong Trails compiled from versioned research rows into field-level Claims;
- the source-specific difficulty categories, including beginner/intermediate mixes and park Trails;
- compact Trail search by name or code, stable direct URLs, and automatic map focus;
- a source-aligned Panorama Map that keeps the published panorama as visual layout truth and layers 33 clickable Trail Locations plus major L1/L2/L3/L5/L7 Uphill Transport overlays on top;
- directed Trail, Transport Station, and Place endpoints validated against evidence-backed Map Nodes;
- a schematic Route Planner backed by directed downhill Trail and typed Uphill Transport edges; unsupported connections fail closed instead of being guessed;
- explicit missing values rather than inferred parameters, plus season, evidence, and non-navigation disclosures.

Route Plans are schematic and season-scoped; they are not GPS navigation and do not reflect live lift/trail operating status or safety conditions. The product does **not** provide personalized ability-based route recommendations.

## Local development

Node.js 24 is required (`.nvmrc` is included).

```bash
nvm use
npm install
npm run dev
```

The development server runs at `http://127.0.0.1:4173` by default.

## Validation

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Content validation rejects duplicate Source Snapshot, Trail, or Claim identifiers; Claims that reference missing Trails or Source Snapshots; unresolved multiple Claims for one published field; and values that do not match the versioned schema.

## Evidence boundary

`src/data/fulong-v1.ts` stores versioned research inputs: the 33 source rows, Trails, immutable Source Snapshots, field-level Claims, and the evidence-backed topology graph. `compilePublication` produces browser-safe Published Fields at build time while preserving source provenance and verification state.

The current parameters and panorama layout are sourced from the public page “崇礼富龙滑雪场雪道参数及雪道总览图” and remain marked `reference_only`. The current fidelity build includes a source-aligned reference panorama layer for visual orientation, with separate SVG hit targets, selection, route highlighting, and evidence state on top. Unsupported values remain unavailable rather than being derived, and the interactive geometry is not GPS or survey-grade.

## Deployment

Pushes to `main` deploy the Vite production build to GitHub Pages through `.github/workflows/deploy-pages.yml`. The production build uses the `/ski-trail-atlas/` base path, and a lightweight `404.html` fallback preserves stable SPA Trail URLs on GitHub Pages.
