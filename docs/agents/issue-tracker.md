# Issue tracker: GitHub

Specs and executable tasks live in GitHub Issues for
`Zachary-wW/ski-trail-atlas`. Run the `gh` CLI inside this clone, adding
`--repo Zachary-wW/ski-trail-atlas` when an explicit target is needed.

## Read and write conventions

- Inspect issues with `gh issue view <number> --comments` and include labels.
- List and filter issues with explicit state and label filters.
- Publish approved specs and tasks with `gh issue create`.
- Update labels and comments with `gh issue edit` and `gh issue comment`.
- Close a task only after its acceptance evidence is recorded.
- Resolve an ambiguous GitHub number as either an issue or PR before treating
  it as a task.

## Spec and ticket workflow

`docs/specs/` contains the durable scope and decision context. GitHub Issues
contain executable task status, blockers and acceptance evidence. After
publication, keep the spec linked from the milestone index and checkpoint;
do not duplicate changing task status in multiple files.

Publish the parent spec before its approved tasks, then publish tasks in
dependency order. Apply `ready-for-agent` to fully specified work. Preserve
blocking edges with GitHub native dependencies when available; otherwise add
explicit `Blocked by: #...` links in each issue body. A task is actionable only
when every blocker and review prerequisite is complete.

Before creating issues or labels, inspect the remote to avoid duplicates.
Creating a project board, milestone object or PR request surface is outside
the current setup.

## Ownership of records

- GitHub Issues: executable task status, blockers and acceptance evidence.
- `docs/MILESTONES.md`: product outcomes and milestone gates.
- `CONTEXT.md` and `docs/adr/`: vocabulary and durable decisions.
- `docs/agents/codex-handoff.md`: branch, dirty work, actual validation,
  interruptions and the next action.

## Pull requests as a triage surface

PRs as a request surface: no.
Feature branches and reviewed PRs are the delivery path. Publishing a tracker
issue does not authorize a main merge, push or deployment.
