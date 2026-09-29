# Chongli resort intelligence: product boundaries

Updated: 2026-09-29. Delivery sequence: [M0–M5](MILESTONES.md).

## Product and audience

Ski Trail Atlas is a Chongli-wide information website. The homepage introduces
Chongli resorts and each resort's season-specific opening outlook. Fulong is
the first complete atlas/template; other Chongli resorts follow through shared
data contracts. Other regions are later scope.

Before a trip, visitors should be able to compare opening outlooks, enter a
resort, find a trail, inspect its map position and evidence, watch a relevant
video, consult a qualified Route Plan and read dated resort updates.
Experienced skiers need recognizable maps and explicit differences between
source information and user reports. Reviewers need provenance, conflict
handling, freshness and retraction controls.

This is a cumulative product direction, not a promise that every capability
ships in M0. Directory coverage is separate from deep resort coverage.
Current implementation and WIP are recorded in the
[project checkpoint](agents/codex-handoff.md), not duplicated here.

## Evidence and safety boundaries

- A source-faithful map preserves relative layout, not GPS/survey accuracy.
- Opening estimates are separate from official announcements and observed
  operations. A countdown reaching zero does not prove a resort is open.
- Published trail information and videos retain evidence, season, match scope
  and explicit missing/conflicting/stale states.
- Routes use reviewed directed topology; they do not promise safety, live
  access, travel time or suitability for a skier's ability.
- Social posts and collected articles are candidates until reviewed. Public
  access does not imply permission to republish text, images or videos.

## Platform and client boundaries

Keep one published domain contract for Resort Packages, trails, maps,
transports, route graphs, evidence and Resort Feeds.

- **Catalog:** resort/trail identities, transports, places and season attributes.
- **Map:** reference contracts, original linework, nodes, facilities and interaction.
- **Routing:** reviewed directed topology and qualified Route Plans.
- **Evidence:** Source Snapshots, Claims, Video Matches and review state.
- **Content:** Information Items, Editorial State and Resort Feeds.
- **Collection:** Source Channels, Collection Runs and candidates.
- **Publication:** versioned snapshots, validation, rollback and client reads.
- **Clients:** render published data; collection and editorial decisions remain
  outside client-specific UI logic.

These are responsibilities, not a requirement to create eight packages.
Prove reuse with a small second-resort slice before M2 closes, then complete a
second resort in M5 without copying Fulong business logic.

## Client strategy and deferred decisions

The Web application on GitHub Pages is the first delivery surface.
A future WeChat Mini Program may consume the same contract after content/API,
sharing, authentication and operating requirements are understood. It is not
currently committed and must not create a second source of business rules.

Do not prematurely choose a backend/database/scheduler vendor, collection
technology, cross-platform framework, accounts, favorites, subscriptions,
notifications, monetization or advertising. Make those decisions against the
relevant milestone's evidence and preserve significant outcomes in ADRs.

The [content ingestion contract](content-ingestion.md) and ADRs 0006/0007
define future collection/client boundaries without claiming they exist today.
