# 01: Make the Panorama Map the primary interaction surface

**What to build:** Replace the persistent left Trail Catalog and right floating inspector with a compact search control above a dominant Panorama Map, automatic Trail focusing, and readable Trail details below the map.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] Ordinary interface labels and controls use a substantially more readable type scale; no core interaction depends on 7–10px text.
- [x] Search occupies only a compact control area above the map and reveals matching Trail results progressively.
- [x] Selecting from search or clicking a mapped Trail keeps the stable Trail URL, highlights the Trail, and focuses the map around it.
- [x] Trail detail content is rendered below the map rather than over Trail geometry.
- [x] Desktop and 390px mobile layouts remain usable without horizontal overflow.
- [x] Existing bilingual, evidence, map zoom/pan, keyboard, and direct-link behavior remains intact.

## Comments

Implemented a compact progressive Trail search, full-width Panorama Map, automatic selected-Trail focusing on direct/search/map navigation, and a non-overlapping detail sheet below the map. Raised the core control/detail typography scale and preserved the existing evidence, bilingual, direct-link, zoom/pan, keyboard, contrast, and mobile behavior. Full validation passed with 16 content tests and 15 browser tests.
