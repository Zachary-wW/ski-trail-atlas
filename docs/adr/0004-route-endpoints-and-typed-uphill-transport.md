---
status: accepted
---

# Route from explicit endpoints and preserve uphill transport type

Route Planning will select Route Endpoints rather than assuming every trip begins and ends with a Trail. A Route Endpoint may be a Trail, a Transport Station, or a named Place such as Base or Summit. Uphill conveyances are modeled under an Uphill Transport concept with an evidence-backed Transport Type such as chairlift, gondola, or magic carpet; their top and bottom Transport Stations are separate endpoints because selecting a transport name alone is directionally ambiguous. Trail endpoints preserve the existing semantic that a starting Trail is traversed first and a destination Trail is traversed last, while Station and Place endpoints begin or end directly at their bound Map Node. Routing continues to consume only published directed graph edges, fails closed when connectivity is unsupported, and never derives connections from SVG proximity, straight-line distance, or visual overlap.
