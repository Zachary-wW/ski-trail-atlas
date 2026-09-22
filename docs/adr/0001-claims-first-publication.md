---
status: accepted
---

# Separate source claims from published resort data

Resort maps and trail attributes vary by publisher, season, and inventory scope, so the product will preserve immutable Source Snapshots and field-level Claims before selecting Published Fields. The public website consumes only validated publication data, keeps conflicts and missing values visible, and never lets a daily Operating Snapshot overwrite the Trail Catalog; this costs more modeling and editorial work than a single canonical JSON file, but prevents unsupported precision and makes every displayed value traceable.
