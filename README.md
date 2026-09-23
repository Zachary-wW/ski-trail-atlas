# Ski Trail Atlas

**English** | [简体中文](README.zh-CN.md)

An evidence-first interactive trail atlas for Fulong Ski Resort. The current release covers the 33 Trails listed by the active parameter source, supports search and stable direct links, and exposes source-reported difficulty, slope, length, width, elevation, verification state, and evidence.

The longer-term product is designed to expand beyond Fulong. Its Panorama Map uses original SVG artwork and an evidence-backed relative topology graph rather than republishing a source map. All current geometry remains explicitly unverified and non-navigational.

## Live site

GitHub Pages: <https://zachary-ww.github.io/ski-trail-atlas/>

The website defaults to English and includes an in-page switch to Simplified Chinese. Source-native trail names and source titles remain in their original language.

## Current status

The current map-first release includes:

- 33 source-listed Fulong Trails compiled from versioned research rows into field-level Claims;
- the source-specific difficulty categories, including beginner/intermediate mixes and park Trails;
- compact Trail search by name or code, stable direct URLs, and automatic map focus;
- a global original SVG topology with 33 clickable Trail Locations and the major visible L1/L2/L3/L5/L7 lifts;
- directed Trail topology endpoints that are validated against evidence-backed Map Nodes;
- explicit missing values rather than inferred parameters, plus season, evidence, and non-navigation disclosures.

The product does **not** currently provide the planned multi-Trail Route Planner, real-time operating status, GPS navigation, safety judgement, or personalized recommendations.

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

The current parameters are sourced from the public page “崇礼富龙滑雪场雪道参数及雪道总览图” and marked `reference_only`. The site publishes textual parameters and an outbound source link only; it does not bundle or republish that source's trail map. Unsupported values remain unavailable rather than being derived.

## Deployment

Pushes to `main` deploy the Vite production build to GitHub Pages through `.github/workflows/deploy-pages.yml`. The production build uses the `/ski-trail-atlas/` base path, and a lightweight `404.html` fallback preserves stable SPA Trail URLs on GitHub Pages.
