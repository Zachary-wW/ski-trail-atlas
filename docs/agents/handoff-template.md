# Project checkpoint — `<milestone-id>` / `<short-name>`

Updated: `<YYYY-MM-DD>`

Use this template to update `codex-handoff.md` at a meaningful boundary.
It is a durable project checkpoint, not the temporary output of the `handoff`
skill. Link to issues/specs instead of copying their full task lists.

## Resume first

- Repository: `/Users/weizhihao/workspace/project/skiing/ski-trail-atlas`
- Branch: `<branch>`
- Commit: `<full SHA>`
- Working tree: `<clean | dirty; list intentional files>`
- Milestone: `<M0–M5>`
- Primary source: `<link to the milestone or spec>`
- Task: `<GitHub issue URL, or explicitly approved local draft>`
- Approval state: `<approved scope; decisions still awaiting the user>`

## Objective

One sentence describing the user-visible outcome this handoff is carrying.

## Done

- `<observable result>`
- `<test or document that proves it>`

## In progress

- `<specific unfinished slice>`
- `<current failing test, if any>`

## Next action

The next agent should do exactly this first:

```text
<one concrete command or one concrete edit>
```

Completion criterion:

```text
<what must be true when that action is finished>
```

## Files and seams

- `<file>` — `<why it matters>`
- `<file>` — `<public interface or test seam>`

## Decisions to preserve

- `<decision and its source: CONTEXT.md, ADR, baseline, or user review>`
- `<uncertainty that must remain visible>`

## Validation

Commands already run:

```bash
<command>
```

Observed result:

```text
<short result>
```

Commands still required before closing this milestone:

```bash
npm run typecheck
npm run test:content
npm run test:e2e
npm run build
git diff --check
```

## Blockers and risks

- `<blocker, or "none">`
- `<risk that must not be silently resolved by inference>`

## Interruption and resume

- Paused task: `<issue, or none>`
- Interrupting bug/decision: `<link and reproduction, or none>`
- Preserved WIP: `<files, branch/commit; never imply dirty work is in a commit>`
- Resume condition: `<regression evidence or user decision needed>`
- Release state: `<not committed | committed | pushed | merged | deployed; evidence>`

## Boundary decision

Choose one before leaving the session:

- `Continue` — the next phase needs this conversation as a primary source.
- `handoff` — work is moving to another harness, directory or person.
- `compact` — the context matters but should be summarized for a new session.
- `clear` — the context is disposable.

Record the choice and why:

```text
<choice + one-sentence reason>
```
