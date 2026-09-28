# Ski Trail Atlas MVP Roadmap

Updated: 2026-09-28

## 1. Current baseline

The Fulong full-map surface is published at the Pages root, while the local reference-review
workbench remains available at:

`/?prototype=fulong-trace`

It is a structural MVP, not a live operating-status product or navigation
guarantee.

### Completed

- Repository and local development setup are working with React, TypeScript and
  Vite.
- The user-supplied 3631 × 2560 WEBP is retained as the local calibration source.
  The prototype uses source-image pixel coordinates so the reference raster and
  traced paths share one coordinate system.
- The full-map review prototype supports:
  - reference, overlay and independent-linework modes;
  - sector views for the full map, summit, central/park, west, east and
    beginner areas;
  - zoom, pan, labels, node inspection, trail selection and direct map
    interaction;
  - mobile layout checks without horizontal overflow.
- The current candidate map contains:
  - 65 visual segments;
  - 35 trail-code groups;
  - 3 reference-only features;
  - 9 transport records;
  - 51 segments excluded from directed route planning.
- User-reviewed geometry corrections are recorded, including:
  - C5/C7 shared junction;
  - removal of the false C1-left stub;
  - A7/A8 fork placement and the building gap from B11;
  - C1–岚山餐厅 connection below E1;
  - L3/L5/L7 shared summit terminal;
  - L5 intermediate alighting station;
  - B11 arc smoothing and L2 fan-out spacing.
- Visual conventions are now separated:
  - trails and connectors use consistent 3px screen strokes;
  - transports use purple dashed lines and station symbols;
  - the default see-through mode avoids opaque overlays;
  - the L5 intermediate station is hollow in see-through mode.
- Regression coverage currently passes:
  - 51 content tests;
  - 32 browser tests;
  - TypeScript check and production build;
  - actual SVG crossing checks, shared-node checks, mobile overflow checks,
    terminal alignment checks and transparent-station checks.
- Source and scope boundaries are documented in the MVP plan, calibration notes,
  inventory notes and pilot review record.

### Explicitly not completed

- The full Fulong trail catalog does not yet have reviewed text, statistics or
  trail-specific videos for every candidate trail.
- Difficulty colors are not yet evidence-backed for the full-map candidate set.
- Most new full-map segments remain direction-pending and are excluded from
  production-style routing.
- Uphill transports in the prototype are visual context; they are not yet
  integrated into a published Fulong route graph.
- The Pages root now uses the structural Fulong surface; full content and
  directed-route publication remain unfinished.
- No CMS, editorial workflow, live operating-status feed, authentication or
  multi-resort switcher is included.

## 2. Product boundary for the MVP

The first shippable MVP should answer one narrow question well:

> For Fulong, can a user find a trail, understand its reviewed details and
> video evidence, and see a clearly qualified route plan on the same map?

The MVP should not claim live opening status, safety advice, GPS navigation,
survey-grade distances or complete resort-wide route coverage until those fields
have their own evidence and review states.

## 3. Future implementation plan

### Phase 0 — Freeze the structural baseline

**Goal:** stop geometry churn from leaking into content and routing work.

- Tag the current full-map candidate snapshot.
- Keep the source raster, user corrections and review screenshots as immutable
  provenance.
- Create a small migration note mapping prototype segment IDs to future published
  `TrailLocation` records.
- Define the acceptance rule for later geometry changes: new source evidence,
  not visual preference alone.

**Exit criteria**

- One named baseline revision exists.
- Every later geometry edit has a source note and a focused regression.

### Phase 1 — Establish the publication data contract

**Goal:** separate review geometry from publishable trail content.

Add or finalize domain records for:

- `Resort`;
- `Trail`;
- `TrailLocation` and `MapNode`;
- `UphillTransport` and `TransportStation`;
- `SourceSnapshot` and field-level claims;
- `VideoMatch`;
- `OperatingSnapshot`;
- directed `RouteSegment` and `RoutePlan`.

Every user-visible field needs an explicit state such as verified, unverified,
missing, conflicting, stale or link-only.

**Exit criteria**

- Prototype geometry can be referenced without importing the full prototype
  singleton into production components.
- Missing or conflicting values render explicitly.
- Route code consumes typed graph data rather than SVG proximity.

### Phase 2 — Fulong trail detail MVP

**Goal:** make trail selection useful beyond the map line.

Start with a small tracer-bullet set: B10, B11, B12, B13, B15 and the accepted
east baseline. For each trail, implement:

- name and code;
- reviewed difficulty or an explicit unknown state;
- short description;
- entry and exit notes;
- known connections;
- evidence links and source date;
- video match state: trail-specific, zone-level, resort-level or missing.

Then expand to the remaining Fulong trail groups in review batches.

**Exit criteria**

- Selecting a trail opens a stable detail view.
- The detail view never invents missing values.
- A video placeholder is distinguishable from a reviewed video match.
- Map selection, detail selection and direct links resolve to the same trail ID.

### Phase 3 — Directed Fulong route planning

**Goal:** turn reviewed topology into a qualified route demonstration.

- Promote only reviewed directed trail edges.
- Add verified lift edges with top/bottom station semantics and transport type.
- Keep direction-pending geometry visible but excluded.
- Support trail, transport-station and place endpoints.
- Return an explicit no-route state when evidence is insufficient.
- Highlight the exact shared segment geometry used by the route result.

**Exit criteria**

- At least one complete, reviewed Fulong route works end to end.
- Route output names every trail and uphill transport step.
- Reverse travel is not inferred from an undirected visual connection.
- Route tests cover missing edges, wrong direction and unknown endpoints.

### Phase 4 — User-facing MVP interaction

**Goal:** connect search, map, detail and planning into one coherent flow.

- Trail search and code lookup.
- Map click → detail panel.
- Detail panel → “show on map”.
- Detail panel → video evidence.
- Start/end selectors that use typed endpoints.
- Desktop inspector and mobile bottom-sheet/drawer behavior.
- Accessible labels, keyboard navigation and clear uncertainty states.

**Exit criteria**

- A user can complete the full find → inspect → watch → plan flow without
  opening the source workbench controls.
- 390px and desktop layouts remain usable.
- Visual distinction does not rely on color alone.

### Phase 5 — Editorial and operating-data readiness

**Goal:** make updates maintainable without editing geometry code.

- Add a validated content import format or lightweight editorial data layer.
- Store source snapshots and review notes beside imported fields.
- Add season-aware operating snapshots without mutating the trail catalog.
- Add review queues for missing, conflicting and stale fields.
- Add a data-quality report for unlocated trails, orphan nodes and route edges.

**Exit criteria**

- Content updates do not require hand-editing React components.
- A reviewer can trace every published field to its source and season.
- Operating status can change without rewriting trail identity or topology.

### Phase 6 — Production promotion and additional resorts

**Goal:** promote only the reviewed slice and reuse the architecture.

- Define the production publication boundary for Fulong.
- Expand the structural MVP into the reviewed content MVP before replacing
  legacy detail behavior as the primary product flow.
- Add observability, performance checks, accessibility checks and rollback notes.
- Introduce a `resortId` content package for the next resort.
- Reuse the map/detail/route interfaces rather than duplicating Fulong logic.

**Exit criteria**

- Production Fulong pages have an explicit evidence and season policy.
- The second resort can be added through the data contract, not a second
  hard-coded prototype.

## 4. Recommended next slice

The next implementation slice should be Phase 0 plus the smallest part of
Phase 1 and Phase 2:

1. Freeze the current geometry baseline.
2. Define the publishable `Trail`/`TrailLocation`/`VideoMatch` shape.
3. Populate B10/B11/B12/B13/B15 with explicit missing-value states.
4. Build the first trail detail panel from that data.
5. Add one reviewed route fixture only after its directed edges are identified.

This keeps the current visual work intact while producing the first complete
user workflow. It also exposes data-contract problems before the remaining
trail catalog is populated.

## 5. Risks and decisions to preserve

- Do not call the candidate map “1:1 accepted” until the user accepts each
  relevant sector against the source raster.
- Do not infer difficulty from temporary annotation colors or trail codes.
- Do not infer route direction from an undirected shared node.
- Do not represent a missing video as a recommendation.
- The public structural map may display direction-pending geometry, but must
  exclude it from route calculations.
- Keep the local high-resolution source out of published assets unless its
  distribution rights and publication policy are explicitly resolved.

## 6. Platform expansion after the Fulong MVP

The map MVP is the first product slice, not the complete platform. The
platform-level north star and content ingestion boundary are documented in
[the platform vision](platform-vision.md) and [the content ingestion contract](content-ingestion.md).

After the first Fulong content loop, continue in this order:

1. **Publishable content snapshot** — move trail details, video matches and
   Resort Feed items behind one versioned publication boundary.
2. **Editorial content loop** — add source channels, collection runs,
   candidate content, deduplication and review states; start with official
   sources and manually supplied public links.
3. **Season and operating snapshots** — let dated notices update operating
   context without mutating Trail identity or geometry.
4. **Client-neutral read contract** — expose map, detail, route and Resort Feed
   data in a form a Web client and a future Mini Program can both consume.
5. **Second-resort package** — prove another resort can be added through data
   packages and source policy rather than duplicated React components.
6. **Mini Program decision** — only after the content/API/review loop is stable,
   decide whether a WeChat Mini Program is justified and what capabilities it
   needs.

The repository should not begin with an automated Xiaohongshu or WeChat crawler.
First prove the content model, source policy, editorial workload and rollback
behavior with a small, reviewable set of official and manually supplied links.
