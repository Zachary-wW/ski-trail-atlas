# Ski Trail Atlas

**English** | [简体中文](README.zh-CN.md)

A map-first ski-resort information platform, starting with Fulong: a complete,
reference-faithful trail map, trail-by-trail evidence, route planning and
source-reviewed resort information. A future WeChat Mini Program remains an
explicit product option, not a current implementation promise.

## What is actually implemented

The GitHub Pages root now renders the Fulong structural MVP: a full-map
linework surface with sector views, trail selection, transport context and
qualified route demonstration. Trail narratives, reviewed videos, and the
production Fulong route graph are still unfinished.

The local `/?prototype=fulong-trace` workbench adds reference/overlay review
against the supplied 3631 × 2560 WEBP. Both surfaces share the same candidate
segments; only the local workbench loads the private raster. Direction,
evidence, and publication states remain explicit, and candidate geometry is not
yet the production route graph.

The long-term product boundary is described in
[the platform vision](docs/platform-vision.md), while collection, provenance
and editorial rules live in [the content ingestion contract](docs/content-ingestion.md).

[Current scope and acceptance gates](docs/mvp-rebuild.md) are the execution
source of truth. [The future delivery plan](docs/mvp-roadmap.md) is the roadmap,
and [the tracing review](docs/trace-pilot-review.md) is the correction and test
record.

## Run locally

Use Node.js 24 (`.nvmrc`):

```bash
nvm use
npm ci
npm run dev
```

The legacy detail application remains available at
`http://127.0.0.1:4173/` during development.

For the tracing pilot, place the supplied WEBP at
`artifacts/reference/fulong-highres.webp`, then run:

```bash
npm run dev:trace
```

Open `http://127.0.0.1:4173/?prototype=fulong-trace`. If the dev server is already
running, open that URL directly. The image lives in a gitignored folder and is
served by a development-only endpoint. The production build publishes the
original linework and does not include the high-resolution raster.
The old `?prototype=east-trace` alias remains available for east-sector comparison.

See [the reference and calibration contract](docs/research/fulong-reference-calibration.md).

## Validate

```bash
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Existing tests protect legacy behavior; passing them is **not** proof of
reference fidelity or of accurate on-mountain connections.

## Repository guide

- `src/` — existing application.
- `src/map/prototype/` — current shared Fulong map implementation; reference
  comparison controls are development-only.
- `docs/mvp-rebuild.md` — active MVP scope and review gate.
- `docs/mvp-roadmap.md` — phased delivery plan after the tracing baseline.
- `docs/trace-pilot-review.md` — user corrections and regression evidence.
- `docs/adr/` — durable decisions, including their supersession status.
- `docs/research/` — source registry, calibration, and inventory contracts.
- `prototypes/design-directions/` — archived visual explorations, not deployed.

Pushing `main` triggers GitHub Pages deployment. The root publishes the
structural Fulong MVP; legacy detail routes remain available for regression
compatibility. The existing production JPG is a legacy asset whose publication
policy remains separate from the new linework. Do not treat possession of the
new WEBP as publication approval.
