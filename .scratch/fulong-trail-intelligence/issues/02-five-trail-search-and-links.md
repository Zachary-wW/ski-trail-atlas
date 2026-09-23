# 02: Add five-Trail search and direct links

**What to build:** A small representative Fulong Trail Catalog that lets a skier browse, search by name or code, select a Trail, and open or share its stable direct URL.

**Blocked by:** 01: Deliver one Trail end to end.

**Status:** completed

- [x] Approximately five evidence-backed Trails cover different difficulty and completeness states.
- [x] Search matches Trail names and codes.
- [x] Catalog selection opens the corresponding Trail details.
- [x] Each Trail has a stable Resort-scoped direct URL.
- [x] Loading a direct URL restores the selected Trail.
- [x] Browser tests cover search, selection, an unknown query, and direct navigation.

## Comments

Implemented five evidence-backed Trails (A1, D1, A7, B1, B13), including D1 as an intentionally incomplete record. Added name/code search, catalog selection, stable `/trails/<trail-id>` links, direct-route restoration, and browser coverage for the ticket acceptance criteria.
