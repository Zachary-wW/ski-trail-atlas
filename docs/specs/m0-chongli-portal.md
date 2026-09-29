# M0 — Chongli portal and opening outlook

Updated: 2026-09-29.
Status: **approved and published; T1 implemented, M0 incomplete**.
Prepared with `to-spec`; the final section records the approved `to-tickets`
slices. The GitHub parent issue and task links are listed below.
The approved product sequence is [M0–M5](../MILESTONES.md).

## Problem Statement

A visitor currently reaches a Fulong structural map rather than a Chongli
portal. They cannot compare each resort's expected opening date or distinguish
historical evidence, a current announcement and an estimate. Resort entrances
and available capabilities are not presented consistently.

Production and development entry behavior differ, and legacy trail details
use a different map/data surface. A portal must preserve working links and
the Fulong structural baseline without pretending those surfaces are unified
or the full atlas is finished.

## Solution

Make the public root a Chongli directory with a season label and a separate
opening outlook for every reviewed in-scope resort. Each outlook shows its
evidence state, source and review date; show a countdown only when a supported
date is available. Keep dates independently editable through publication data.

Let visitors enter Fulong's existing structural map from a stable resort
entrance. Other resorts get honest overview/availability states, not Fulong
content or inactive controls that imply complete maps. Retain legacy trail
links and supported reference-workbench aliases while the portal becomes the
normal entry in development and production.

## User Stories

1. As a trip planner, I want to land on a Chongli overview, so that the site's
   regional scope is clear before I choose a resort.
2. As a trip planner, I want every reviewed in-scope resort listed, so that
   missing opening data does not hide a resort.
3. As a visitor, I want each resort's own opening date/countdown, so that one
   resort's date is not presented as a Chongli-wide opening day.
4. As a visitor, I want the applicable snow season shown, so that I do not
   confuse historical information with this season.
5. As a visitor, I want announced and estimated dates distinguished in text,
   so that visual prominence does not imply certainty.
6. As a visitor, I want a historical estimate's method and source date, so that
   I can judge its basis rather than mistake it for an official announcement.
7. As a visitor, I want unavailable/conflicting evidence shown honestly,
   so that fabricated precision does not influence my plans.
8. As a visitor, I want original source links and observation/review dates,
   so that I can inspect provenance and freshness.
9. As a traveler in another timezone, I want a countdown based on Chongli's
   calendar day, so that it does not change meaning with my browser timezone.
10. As a visitor on or after a target date, I want an honest status message,
    so that a timer reaching zero is not mistaken for confirmation of opening.
11. As a Fulong visitor, I want to enter the structural map and return to the
    portal, so that existing map work stays usable within the wider website.
12. As a visitor to another resort, I want its own overview and capability
    gaps, so that I am not silently redirected to Fulong information.
13. As a returning visitor, I want existing trail links and shared URLs to
    survive direct load and refresh, so that bookmarks remain useful.
14. As a visitor with an invalid resort/trail URL, I want a clear not-found
    state and a working return link, so that unrelated content is not substituted.
15. As a mobile visitor, I want readable outlooks and reachable source/resort
    links without horizontal scrolling, so that the overview is usable on a phone.
16. As a keyboard user, I want meaningful headings, visible focus and usable
    navigation, so that I can complete the portal-to-resort flow without a mouse.
17. As an editor, I want to update a reviewed date without changing geometry
    or UI logic, so that seasonal changes do not destabilize map data.
18. As an editor, I want conflicts and missing facts to remain reviewable,
    so that content gaps are not silently normalized into dates.
19. As a maintainer, I want production-base and private-asset checks, so that
    a working dev page does not conceal a broken or inappropriate release.
20. As a maintainer, I want a recoverable publication revision, so that an
    incorrect date or broken navigation can be rolled back.

## Implementation Decisions

### Established scope and constraints

- Web first; static reviewed publication data is sufficient for M0. No live
  content API, scheduler or crawler is required.
- Stable Resort identity scopes each overview and its opening outlook.
  Capability availability is separate from inclusion in the directory.
- Reuse the existing publication/evidence and URL boundaries where practical.
  Do not require the unfinished multi-segment routing migration to complete M0.
- Introduce the portal around the structural Fulong map; preserve existing
  trail URLs and their legacy detail behavior. Full data/UI convergence is not
  claimed by this milestone.
- Retain source URL, publisher/channel, original publication date when known,
  observed/reviewed dates, applicable season, verification and permitted use.
  An estimate also records the historical event dates and its method/rationale.
- Historical opening events, current-season announced targets and current
  operations are different claims. Distinguish trial/partial opening from
  full-resort opening when the source does.
- Official-first review; social posts are leads or explicitly attributed
  evidence. Public accessibility alone does not grant republication permission.
- Keep the existing language behavior of the Fulong and legacy surfaces.
  English repository documentation does not mandate an English-only public UI.
- Preserve the private reference asset boundary and existing geometry.

### Proposed behavior requiring confirmation

Use the 2026–2027 season for the first editorial review, subject to actual source
availability. Store the selected season explicitly rather than deriving it from
the visitor's current month.

| Evidence condition | Proposed user-visible behavior |
| --- | --- |
| Reviewed current-season official announcement with an exact date | Announced target, source and countdown; not “verified open” |
| Reviewed historical evidence with an explicit current-season estimate | Estimated target, historical source/date, method and countdown |
| Only a date window or month is supported | Display that window; omit a precise daily countdown |
| No adequate evidence | Date unavailable; no numeric countdown or invented default |
| Unresolved material conflict | Display the conflict and sources; suppress the precise countdown until reviewed |
| Selected evidence is stale/retracted or for another season | Show the reason; do not count down to it as current-season evidence |
| Target date is today | Announced/estimated target is today; actual operation remains unconfirmed |
| Target date has passed | Target date has passed, awaiting update; no negative countdown or automatic “open” |

Count calendar-day boundaries in `Asia/Shanghai`, including a midnight refresh
while the page remains open and refresh on returning to the page. The clock
must be controllable in tests. Do not use a visitor-local 24-hour rounding rule.
Real dates are editorial inputs, not values invented to complete this draft.
The opening-data research must record how historical observations support each
estimate; there is no automatic year-rollover rule.

## Testing Decisions

The user approved one high-level acceptance seam: the visitor's experience of
the built publication at the production base path.
Add one narrow deterministic data/clock seam for exhaustive date cases.

### A. Primary seam: built-site user journey

Exercise the public root → resort overview → Fulong map → portal flow,
source links, unavailable resort capabilities, legacy trail links, direct
navigation/refresh, unknown IDs and browser back/forward.
Exercise the actual shipped 404 recovery document, not just Vite's SPA fallback.
Protect supported prototype aliases and their development-only calibration
behavior without turning the portal into a calibration workbench.

Run at desktop and 390px mobile sizes. Verify headings, focus, keyboard
navigation, readable state labels and no horizontal overflow. Inspect network
requests and generated assets for accidental private-reference publication.
Test observable behavior rather than component names or the new DOM structure.

Prior art: existing built-Pages homepage/deep-link tests, the app-path tests,
and legacy detail/release-quality browser tests. Update the root expectations
deliberately while retaining map regressions at the resort entrance.

### B. Supporting seam: published opening outlook + explicit clock

Through the publication boundary, test valid/invalid dates, missing sources,
resort/season mismatches, independent resorts, announced versus estimated
classification, windows, conflicts, stale/retracted evidence and invalid input
rejection. Validate cross-references and preserve historical source dates.

Test the day before, target day and day after; Shanghai midnight; month/year
boundaries; valid leap-day and invalid calendar dates; season changes; and two
browser timezones. A past date never becomes an “open” state by calculation.
Use fixtures and a fixed clock, not live scraping or today's wall clock.

Prior art: existing publication-compiler contract tests and app-path unit tests.
No third component-only test layer or social-platform mock service is proposed.

### C. Human evidence gate

A reviewer accepts the Chongli roster, seasonal source records, opening-event
scope and estimate rationale before real data is published. Record gaps per
resort. Browser/unit tests cannot prove an opening date true or a reuse right.
The M1 sector-fidelity review remains separate from M0.

### Completion and release evidence

Run typecheck, content tests, development browser checks and the built-Pages
suite (which builds first), plus a diff check. Record exact results and
unresolved failures against the candidate revision. Verify rollback to the
previous accepted revision before an authorized release. No deployment is
authorized by approving this specification alone.

## Out of Scope

- Full Fulong information/facility/difficulty completion (M1).
- Video curation and refined trail-video interaction (M2).
- Promoting candidate route edges or completing production routing (M3).
- Scheduled daily collection, CMS/editorial backend or automated feeds (M4).
- Complete maps for other resorts (M5), other regions, or a Mini Program.
- Live operations, GPS/navigation/safety guarantees, accounts, subscriptions,
  ticket transactions, or unauthorized media republication.
- Broad refactoring of preserved schema/routing WIP.

## Further Notes

The seven existing ADRs remain in force. This draft adds no accepted ADR or
domain definition for “Opening Outlook” yet; it is proposed terminology for
the season-specific presentation of opening Claims and Published Fields.

No opening-date research results are claimed here. Last-season records,
current-season notices and the complete Chongli roster still need verification.
The [social-source tooling review](../research/social-source-tooling.md) found
that Agent Reach is a useful installer/diagnostic layer around Xiaohongshu
access, not a collector or WeChat channel. M0 remains manual and reviewed;
installing any collector is not a prerequisite for the portal.

Uncommitted publication/routing changes predate this draft and remain preserved.
The [checkpoint](../agents/codex-handoff.md) identifies them and their validation
limitations. They are not a completed dependency or a reason to relabel M0 done.

## Published GitHub records

The following are the published GitHub records. GitHub owns changing task
status; this document retains the durable scope and acceptance context.

- Parent spec: [#2 — M0: Chongli portal and opening outlook](https://github.com/Zachary-wW/ski-trail-atlas/issues/2)
- T1: [#3 — Enter Fulong through a production-safe Chongli portal](https://github.com/Zachary-wW/ski-trail-atlas/issues/3)
- T2: [#4 — Inspect a sourced opening outlook and reliable countdown](https://github.com/Zachary-wW/ski-trail-atlas/issues/4)
- T3: [#5 — Open a second Chongli resort without borrowing Fulong capabilities](https://github.com/Zachary-wW/ski-trail-atlas/issues/5)
- T4: [#6 — Compare the reviewed Chongli roster and opening evidence](https://github.com/Zachary-wW/ski-trail-atlas/issues/6)

### T1 — Enter Fulong through a production-safe Chongli portal

**Blocked by:** None after specification/configuration approval.

**What it delivers:** A visitor lands on a minimal Chongli portal, sees the
Fulong entry with an honest unavailable opening-date state, enters the existing
structural map and returns. This is a first slice, not complete directory coverage.

**Acceptance criteria:**

- The ordinary root shows Chongli in development and the built production app.
- Fulong has a stable entrance that preserves geometry and qualified map behavior.
- Direct load, refresh, back/return, legacy trail links and supported workbench
  aliases remain correct under the production base.
- Unknown URLs do not fall back silently to Fulong.
- Keyboard/mobile essentials and private-reference exclusion pass.

### T2 — Inspect a sourced opening outlook and reliable countdown

**Blocked by:** T1.

**What it delivers:** A visitor can inspect a resort's independently sourced
announced/estimated outlook, its evidence and an honest countdown/empty state.

**Acceptance criteria:**

- Publication data drives the displayed target, season, source and review state.
- The proposed evidence/date behavior table and Shanghai day boundaries pass
  deterministic tests through publication and browser seams.
- Historical evidence is not displayed as a current official announcement.
- Two synthetic resort fixtures demonstrate independent dates; synthetic data
  never ships as real resort evidence.
- An editor can replace a reviewed date without changing map geometry/UI logic.
- Source/state interactions remain keyboard/mobile accessible.

### T3 — Open a second Chongli resort without borrowing Fulong capabilities

**Blocked by:** T1 only; it need not wait for T2's countdown implementation.

**What it delivers:** A visitor opens a separately identified, source-backed
second resort overview with explicit unavailable map/video/route capabilities.

**Acceptance criteria:**

- Verify the second resort's identity from a recorded source.
- Its stable overview URL survives refresh and browser navigation.
- Missing deep capabilities are explicit; it renders no Fulong map or trail data.
- Shared directory/overview behavior consumes resort data instead of copied
  Fulong logic. Date may remain unavailable until T2 is integrated.
- Keyboard/mobile navigation and not-found handling pass.

This is an early directory-isolation check, not the deeper map/content contract
probe required before M2 closes.

### T4 — Compare the reviewed Chongli roster and opening evidence

**Blocked by:** T2 and T3.

**What it delivers:** Visitors can compare every resort in the reviewed Chongli
roster using distinct current-season outlooks and inspect their source history.

**Acceptance criteria:**

- Verify and record the in-scope roster and source-backed identities.
- Research previous-season opening events and available current-season official
  notices; evaluate Xiaohongshu/Agent Reach feasibility without assuming access.
- Populate reviewed announced/estimated/window/unavailable states. Missing
  evidence stays explicit; no resort/date is invented to claim completeness.
- Retain event scope, publication/observation dates, source URLs, estimate
  method and reviewer acceptance; record unresolved gaps per resort.
- All roster entrances resolve to their own overview/capability states.
- Full-directory desktop/mobile/keyboard and production-link checks pass.
- Record a publication revision and rollback procedure; promote only after
  a separately authorized release decision.

Keep this ticket bounded to identity/opening evidence, not a full resort content
audit. If source volume cannot fit one working session, propose named resort
batches for approval instead of silently expanding the ticket.

## Approval record

- [x] Primary browser/publication seam A and supporting data/clock seam B.
- [x] Evidence/date behavior table, `Asia/Shanghai` calendar-day policy and
  human evidence gate.
- [x] T1–T4 granularity and blockers.
- [x] GitHub tracker setup and default triage labels.
- Approval date: 2026-09-29, user reply: `ok`.
