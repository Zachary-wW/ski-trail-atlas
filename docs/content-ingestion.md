# Content collection, review and publication contract

Updated: 2026-09-29. Target: M4 daily intelligence. M0 reuses its provenance
principles for manually reviewed opening outlooks; it does not require a crawler.
This document does not authorize bypassing access restrictions or content rights.

## Lifecycle

Source Channel → Collection Run → candidate Information Item → deduplication,
scope and permitted-use checks → editorial review → published Resort Feed →
stale or retracted state.

Collection produces candidates only. Review source identity, resort, season,
publication date and permitted use before any user-visible publication.

## Minimum Information Item record

| Field | Meaning |
| --- | --- |
| `id`, `resortId` | Stable item and resort identities |
| `title`, `summary` | Original/editorial title and source-traceable short summary |
| `sourceChannel` | Official site, official WeChat, Xiaohongshu, government, commercial or community |
| `publisher`, `sourceUrl` | Originating account/organization and original link |
| `publishedAt`, `observedAt` | Source publication time when known and observation time |
| `season`, `topic` | Applicable season; operations, trail, lift, event, lesson, price, weather, transport, community or other |
| `editorialState` | Candidate, needs_review, published, rejected, stale or retracted |
| `verificationState` | Verified, unverified, stale, conflicting, link_only or missing |
| `permittedUse` | Reference_only, link_only, excerpt_allowed, permission_granted or open_license |
| `contentHash` | Deduplication aid, not proof of truth |
| `reviewNotes` | Review decisions, unresolved questions and conflicts |

These describe the future contract; they are not claims about implemented types.

## Display rules

- Reference-only records may show permitted metadata and an original link, not
  copied article bodies or media. Link-only records remain outbound references.
- Excerpts stay within the permission scope. Permission or an open license still
  requires attribution and the original link.
- Missing source/publication dates must not masquerade as today's information.
- Community and user reports are visibly attributed as such.
- Stale items become historical/stale rather than remaining labeled “today.”
- Preserve competing sources until a reviewer resolves a conflict.

## Source strategy

Start with official resort sites, notices and official WeChat accounts; then
government/tourism/transport sources; then commercial maps and specialist
directories for cross-checking. Xiaohongshu, community articles and videos
provide leads and local context, not automatic verification.

Do not assume Xiaohongshu or WeChat offers stable unrestricted background access.
Where an authorized interface is unavailable, retain manually supplied public
links and minimal metadata for review. Respect login, CAPTCHA and access controls.
The [social-source tooling review](research/social-source-tooling.md) recommends
manual M0 research, an optional supervised OpenCLI spike, and a separately
isolated M4 connector evaluation. Agent Reach may assist workstation setup and
diagnostics, but is not the collection or publication data plane.

## Collection Run record and failure handling

Record run ID, start/end times, target channels, runner/rule versions, counts
for discovery/deduplication/rejection/review/publication, failure reasons,
links needing manual intervention and whether the public snapshot changed.

A failed collection must not clear the last valid feed. Publish through
versioned snapshots or controlled incremental changes with rollback evidence.
Retractions and freshness failures must be reflected in the displayed state.

## Separation from maps and routing

An opening notice creates operating evidence; it does not rewrite the Trail
Catalog. A line in a panorama needs geometry/identity review. Difficulty needs
its own attribute evidence. A social route description is a candidate Claim,
not an automatically published directed edge.

## Required future verification

- Duplicate URLs, duplicate content and cross-platform retellings.
- Missing sources/dates, season mismatch and conflicting evidence.
- Reference-only bodies/media excluded from production assets.
- Stale/retracted information no longer presented as today's update.
- Failed collection preserves the previous valid snapshot.
- Reviewed publication and rollback preserve provenance.
- Web and any future Mini Program read the same publication contract.
