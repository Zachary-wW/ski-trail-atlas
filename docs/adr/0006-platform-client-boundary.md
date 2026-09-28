---
status: accepted
---

# Keep the domain contract client-neutral and defer the Mini Program commitment

Ski Trail Atlas will continue to validate the product through the Web client
first, while keeping the published domain contract independent from React,
GitHub Pages, or a future WeChat Mini Program. The domain contract covers
Resorts, Trails, Map Nodes, transports, Routes, Source Snapshots and
Information Items; clients render published snapshots and do not collect
external content or make editorial decisions.

This preserves a usable Web surface while the product is still learning which
map, detail, route and daily-information workflows matter. A WeChat Mini
Program may be added after the API, authentication/share model, content
review loop and operational deployment boundary are understood. Choosing a
specific cross-platform framework or backend now would create commitment before
those decisions are evidence-backed.

The trade-off is that the current Pages deployment is not yet a full platform
backend and the future Mini Program will require a separate delivery phase.
That is intentional: the current Fulong structural MVP must not silently become
the architecture for unreviewed collection, real-time status or client-specific
business logic.
