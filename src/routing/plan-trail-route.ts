export type VerificationState = "verified" | "unverified" | "stale" | "link_only";
export type TransportType = "chairlift" | "gondola" | "magic_carpet" | "unknown";

type TrailRecord = { id: string; code: string; name: string };
type TrailLocation = {
  trailId: string;
  fromNodeId: string;
  toNodeId: string;
  verificationState: VerificationState;
  source: { id: string };
};
type TransportStationRecord = {
  id: string;
  transportId: string;
  nodeId: string;
  role: "bottom" | "top";
  name: string;
  verificationState: VerificationState;
  source?: { id: string };
};
type PlaceRecord = {
  id: string;
  name: string;
  nodeId: string;
  kind: "base" | "summit" | "zone";
  verificationState: VerificationState;
  source: { id: string };
};
type UphillTransportRecord = {
  id: string;
  code: string;
  transportType: TransportType;
  bottomStationId: string;
  topStationId: string;
  verificationState: VerificationState;
  source: { id: string };
  bottomStation: TransportStationRecord;
  topStation: TransportStationRecord;
};

type RoutablePublication = {
  season: string;
  trails: TrailRecord[];
  trailLocations: TrailLocation[];
  transportStations: TransportStationRecord[];
  places: PlaceRecord[];
  uphillTransports: UphillTransportRecord[];
};

export type RouteEndpoint =
  | { kind: "trail"; id: string }
  | { kind: "transport_station"; id: string }
  | { kind: "place"; id: string };

export type RouteSegment = {
  kind: "trail" | "transport";
  id: string;
  code: string;
  name?: string;
  transportType?: TransportType;
  fromNodeId: string;
  toNodeId: string;
  verificationState: VerificationState;
  sourceId: string;
};

export type RoutePlan = {
  startEndpoint: RouteEndpoint;
  destinationEndpoint: RouteEndpoint;
  season: string;
  verificationState: VerificationState;
  segments: RouteSegment[];
};

function combinedVerificationState(segments: RouteSegment[]): VerificationState {
  if (segments.length === 0) return "unverified";
  const priority: VerificationState[] = ["stale", "link_only", "unverified", "verified"];
  return priority.find((state) => segments.some((segment) => segment.verificationState === state)) ?? "unverified";
}

function routeEdges(publication: RoutablePublication): RouteSegment[] {
  const trailById = new Map(publication.trails.map((trail) => [trail.id, trail]));
  const trailEdges = publication.trailLocations.map((location): RouteSegment => {
    const trail = trailById.get(location.trailId);
    if (!trail) throw new Error(`Route topology references missing Trail ${location.trailId}`);
    return {
      kind: "trail",
      id: trail.id,
      code: trail.code,
      name: trail.name,
      fromNodeId: location.fromNodeId,
      toNodeId: location.toNodeId,
      verificationState: location.verificationState,
      sourceId: location.source.id,
    };
  });
  const transportEdges = publication.uphillTransports.map((transport): RouteSegment => ({
    kind: "transport",
    id: transport.id,
    code: transport.code,
    transportType: transport.transportType,
    fromNodeId: transport.bottomStation.nodeId,
    toNodeId: transport.topStation.nodeId,
    verificationState: transport.verificationState,
    sourceId: transport.source.id,
  }));
  return [...trailEdges, ...transportEdges];
}

type ResolvedEndpoint = { nodeId: string; boundarySegment?: RouteSegment };

function resolveEndpoint(
  publication: RoutablePublication,
  endpoint: RouteEndpoint,
  edges: RouteSegment[],
  side: "start" | "destination",
): ResolvedEndpoint | null {
  if (endpoint.kind === "trail") {
    const edge = edges.find((candidate) => candidate.kind === "trail" && candidate.id === endpoint.id);
    if (!edge) return null;
    return { nodeId: side === "start" ? edge.toNodeId : edge.fromNodeId, boundarySegment: edge };
  }
  if (endpoint.kind === "transport_station") {
    const station = publication.transportStations.find((candidate) => candidate.id === endpoint.id);
    return station ? { nodeId: station.nodeId } : null;
  }
  const place = publication.places.find((candidate) => candidate.id === endpoint.id);
  return place ? { nodeId: place.nodeId } : null;
}

function findMiddleSegments(
  edges: RouteSegment[],
  startNodeId: string,
  destinationNodeId: string,
  excludedIds: Set<string>,
): RouteSegment[] | null {
  if (startNodeId === destinationNodeId) return [];
  const outgoing = new Map<string, RouteSegment[]>();
  for (const edge of edges) {
    if (excludedIds.has(edge.id)) continue;
    const bucket = outgoing.get(edge.fromNodeId) ?? [];
    bucket.push(edge);
    outgoing.set(edge.fromNodeId, bucket);
  }
  type QueueItem = { nodeId: string; segments: RouteSegment[] };
  const queue: QueueItem[] = [{ nodeId: startNodeId, segments: [] }];
  const visited = new Set<string>([startNodeId]);
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of outgoing.get(current.nodeId) ?? []) {
      const segments = [...current.segments, edge];
      if (edge.toNodeId === destinationNodeId) return segments;
      if (visited.has(edge.toNodeId)) continue;
      visited.add(edge.toNodeId);
      queue.push({ nodeId: edge.toNodeId, segments });
    }
  }
  return null;
}

export function planRoute(
  publication: RoutablePublication,
  startEndpoint: RouteEndpoint,
  destinationEndpoint: RouteEndpoint,
): RoutePlan | null {
  const edges = routeEdges(publication);
  const start = resolveEndpoint(publication, startEndpoint, edges, "start");
  const destination = resolveEndpoint(publication, destinationEndpoint, edges, "destination");
  if (!start || !destination) return null;

  if (startEndpoint.kind === "trail" && destinationEndpoint.kind === "trail" && startEndpoint.id === destinationEndpoint.id) {
    const segment = start.boundarySegment!;
    return { startEndpoint, destinationEndpoint, season: publication.season, verificationState: segment.verificationState, segments: [segment] };
  }

  const excludedIds = new Set<string>();
  if (start.boundarySegment) excludedIds.add(start.boundarySegment.id);
  if (destination.boundarySegment) excludedIds.add(destination.boundarySegment.id);
  const middle = findMiddleSegments(edges, start.nodeId, destination.nodeId, excludedIds);
  if (!middle) return null;

  const segments = [
    ...(start.boundarySegment ? [start.boundarySegment] : []),
    ...middle,
    ...(destination.boundarySegment ? [destination.boundarySegment] : []),
  ];
  return {
    startEndpoint,
    destinationEndpoint,
    season: publication.season,
    verificationState: combinedVerificationState(segments),
    segments,
  };
}

export function planTrailRoute(publication: RoutablePublication, startTrailId: string, destinationTrailId: string) {
  return planRoute(
    publication,
    { kind: "trail", id: startTrailId },
    { kind: "trail", id: destinationTrailId },
  );
}
