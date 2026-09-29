## Working rules

Before starting or resuming work, read `docs/MILESTONES.md` and
`docs/agents/codex-handoff.md`, then inspect the branch and dirty diff.
The accepted product sequence is M0–M5; current delivery is M0, not the retired
publication-contract milestone. Read the approved specification and linked
GitHub tasks in `docs/specs/m0-chongli-portal.md` before changing M0 behavior.

Before map, content or route changes, read `docs/fulong-atlas-acceptance.md`.
Read `docs/trace-pilot-review.md` when changing geometry or its regressions.
Preserve the pre-existing source/test WIP recorded in the checkpoint. Work on
`codex/` feature branches; merging to `main` and deployment require an explicit
release decision.

Use `CONTEXT.md` and the relevant records in `docs/adr/` for domain vocabulary
and durable decisions. Future milestones are scope boundaries, not authorization
to implement them in the current task.

The source, calibration, and inventory boundaries live under `docs/research/`.
Keep user-visible claims tied to those evidence states and do not turn
development-only candidate geometry into production routing implicitly.

GitHub Issues is the agreed tracker. Read `docs/agents/issue-tracker.md` and
`docs/agents/triage-labels.md` before publishing or changing work items.
The five canonical triage labels are active there. Create issues only after an
approved spec and ticket breakdown; this repository does not use a checked-in
local ticket tracker.

## Agent skills

### Issue tracker

Specs and executable tasks live in GitHub Issues for
`Zachary-wW/ski-trail-atlas`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage roles. See `docs/agents/triage-labels.md`.

### Domain docs

Use the single-context glossary and ADR layout. See `docs/agents/domain.md`.

At a meaningful work boundary or interruption, update the current checkpoint
using `docs/agents/handoff-template.md`. Record actual validation and the next
action. A portable artifact from the `handoff` skill belongs in the OS temporary
directory and links to these durable records.

Keep developer documentation in English; preserve proper names and verbatim
source/UI quotations. Documentation translation does not change UI language.
