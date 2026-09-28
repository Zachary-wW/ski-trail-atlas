# Ski Trail Atlas

**English** | [简体中文](README.zh-CN.md)

A map-first ski-resort MVP, starting with Fulong: a complete, reference-faithful
trail map, trail-by-trail text and video, and route planning on that same map.

## What is actually implemented

The existing `/` application is a **legacy prototype**, not the completed MVP.
It has 33 source-listed trail records, search, metric detail, bilingual UI, and
schematic routing. Trail narratives, reviewed videos, and the production
Fulong route graph are still unfinished.

The current `/?prototype=fulong-trace` workbench is a development-only
full-map tracing surface. It uses the supplied 3631 × 2560 WEBP in its native
coordinate system, supports reference/overlay/linework review, and shares
candidate segments between drawing and interaction. The user has accepted the
overall structural baseline for moving into the content MVP; direction,
evidence, and publication states remain explicit and candidate geometry is not
yet the production route graph.

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

The existing application is at `http://127.0.0.1:4173/`.

For the tracing pilot, place the supplied WEBP at
`artifacts/reference/fulong-highres.webp`, then run:

```bash
npm run dev:trace
```

Open `http://127.0.0.1:4173/?prototype=fulong-trace`. If the dev server is already
running, open that URL directly. The image lives in a gitignored folder and is
served by a development-only endpoint. Neither the new high-resolution image
nor the pilot is part of the production build.
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
- `src/map/prototype/` — isolated, development-only tracing experiment.
- `docs/mvp-rebuild.md` — active MVP scope and review gate.
- `docs/mvp-roadmap.md` — phased delivery plan after the tracing baseline.
- `docs/trace-pilot-review.md` — user corrections and regression evidence.
- `docs/adr/` — durable decisions, including their supersession status.
- `docs/research/` — source registry, calibration, and inventory contracts.
- `prototypes/design-directions/` — archived visual explorations, not deployed.

The legacy site is hosted on GitHub Pages. Pushing `main` triggers deployment;
this local pilot does not change that site. The existing production JPG is a
legacy asset whose publication policy remains to be reconciled before the next
map release. Do not treat possession of the new WEBP as publication approval.
