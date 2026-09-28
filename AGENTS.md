## Working rules

Before map, content, or route changes, read `docs/mvp-rebuild.md` for the active
scope and acceptance gate. Read `docs/trace-pilot-review.md` when changing
traced geometry or its regression coverage.

Use `CONTEXT.md` and the relevant records in `docs/adr/` for domain vocabulary
and durable decisions. `docs/mvp-roadmap.md` describes future work; it is not a
reason to implement every phase in one change.

The source, calibration, and inventory boundaries live under `docs/research/`.
Keep user-visible claims tied to those evidence states and do not turn
development-only candidate geometry into production routing implicitly.

This repository no longer uses a checked-in local ticket tracker. Prefer a
focused issue, plan, or code change with a clear completion criterion.
