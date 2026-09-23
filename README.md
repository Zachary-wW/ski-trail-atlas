# Ski Trail Atlas

**English** | [简体中文](README.zh-CN.md)

An evidence-first trail lookup experience for Fulong Ski Resort. The current release lets skiers browse and search a small representative Trail Catalog, open stable direct links, and inspect source-reported difficulty, slope, length, width, elevation, verification state, and evidence.

The longer-term product is designed to expand beyond Fulong. Its Panorama Map uses original SVG artwork and evidence-backed relative Trail Locations rather than republishing a source map; the current five-Trail geometry remains explicitly unverified and non-navigational.

## Live site

GitHub Pages: <https://zachary-ww.github.io/ski-trail-atlas/>

The website defaults to English and includes an in-page switch to Simplified Chinese. Source-native trail names and source titles remain in their original language.

## Current status

Tickets 01–03 are complete:

- one evidence-backed Trail was implemented end to end through versioned JSON, Zod validation, Claim compilation, and React rendering;
- the Trail Catalog now contains five representative Fulong Trails across different difficulty and completeness states;
- search supports Trail names and codes;
- every published Trail has a stable direct URL such as `/trails/fulong-a1`;
- missing values are rendered explicitly rather than inferred.
- an interactive SVG Panorama Map now synchronizes with Trail selection, supports pointer/keyboard zoom and pan, and exposes topology evidence plus a non-navigation disclaimer.

The product does **not** currently provide real-time operating status, GPS navigation, safety judgement, or personalized recommendations.

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

`src/data/fulong-v1.json` stores research inputs: Trails, immutable Source Snapshots, and field-level Claims. `compilePublication` produces browser-safe Published Fields at build time while preserving source provenance and verification state.

The current parameters are sourced from the public page “崇礼富龙滑雪场雪道参数及雪道总览图” and marked `reference_only`. The site publishes textual parameters and an outbound source link only; it does not bundle or republish that source's trail map. Unsupported values remain unavailable rather than being derived.

## Deployment

Pushes to `main` deploy the Vite production build to GitHub Pages through `.github/workflows/deploy-pages.yml`. The production build uses the `/ski-trail-atlas/` base path, and a lightweight `404.html` fallback preserves stable SPA Trail URLs on GitHub Pages.
