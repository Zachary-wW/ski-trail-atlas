# Ski Trail Atlas

A Chongli-first ski resort intelligence website. The planned homepage brings
together resort entrances and each resort's evidence-backed opening outlook.
Fulong is the first deep atlas/template, followed by the other Chongli resorts.
A future WeChat Mini Program is an option, not a current delivery commitment.

Repository documentation is maintained in English. Chinese proper names and
verbatim source/UI quotations are retained where they preserve evidence.
This policy does not change the application's supported languages.

## What is actually implemented

The public root now renders a minimal Chongli portal. Its first reviewed entry
opens the Fulong structural preview at `/resorts/fulong/map`: a full-map linework
surface with sector views, trail selection, transport context and a qualified
route demonstration. The opening outlook deliberately remains unavailable
until evidence is reviewed. Trail narratives, reviewed videos, and the
production Fulong route graph are still unfinished.

The local `/?prototype=fulong-trace` workbench adds reference/overlay review
against the supplied 3631 × 2560 WEBP. Both surfaces share the same candidate
segments; only the local workbench loads the private raster. Direction,
evidence, and publication states remain explicit, and candidate geometry is not
yet the production route graph.

The long-term product boundary is described in
[the platform vision](docs/platform-vision.md), while collection, provenance
and editorial rules live in [the content ingestion contract](docs/content-ingestion.md).

[M0–M5 milestones](docs/MILESTONES.md) are the delivery index.
M0 is not complete: the first portal slice is implemented, but sourced opening
outlooks, the reviewed Chongli roster and isolated resort overviews remain.
Read the [current checkpoint](docs/agents/codex-handoff.md) for uncommitted work
and the [approved M0 specification](docs/specs/m0-chongli-portal.md) for the next slice.
The [Fulong acceptance contract](docs/fulong-atlas-acceptance.md) and
[tracing review](docs/trace-pilot-review.md) retain map constraints and evidence.

## Run locally

Use Node.js 24 (`.nvmrc`):

```bash
nvm use
npm ci
npm run dev
```

The Chongli portal is available at `http://127.0.0.1:4173/`. The legacy Fulong
detail application remains available at
`http://127.0.0.1:4173/trails/fulong-a1` for compatibility.

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
npm run test:pages
git diff --check
```

`test:pages` builds first and checks the production bundle under its Pages base
path. `test:e2e` checks the development surface; both matter while those entry
paths differ. To build without browser checks, run `npm run build`.

Existing tests protect legacy behavior; passing them is **not** proof of
reference fidelity or of accurate on-mountain connections.

## Repository guide

- `src/` — existing application.
- `src/map/prototype/` — current shared Fulong map implementation; reference
  comparison controls are development-only.
- `docs/MILESTONES.md` — product outcomes, acceptance gates and interruption workflow.
- `docs/specs/` — approval-stage specifications; published task status belongs in GitHub.
- `docs/agents/codex-handoff.md` — current checkpoint and next action.
- `docs/agents/issue-tracker.md` and `docs/agents/triage-labels.md` — active
  GitHub workflow and canonical triage vocabulary.
- `docs/fulong-atlas-acceptance.md` — Fulong map scope and visual acceptance.
- `docs/trace-pilot-review.md` — user corrections and regression evidence.
- `docs/adr/` — durable decisions, including their supersession status.
- `docs/research/` — source registry, calibration, and inventory contracts.
- `docs/research/social-source-tooling.md` — Agent Reach and social-source
  discovery feasibility, with separate M0 and M4 recommendations.
- `prototypes/design-directions/` — archived visual explorations, not deployed.

The deployment workflow runs on pushes to `main` or manual dispatch. Continue
development on feature branches; merging and deploying require an explicit
release decision. The current root serves the Chongli portal; the Fulong
structural map and legacy detail routes remain available through explicit
entrances. The existing production JPG is a legacy asset whose publication
policy remains separate from the new linework. Do not treat possession of the
new WEBP as publication approval.
