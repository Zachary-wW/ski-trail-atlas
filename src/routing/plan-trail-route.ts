type VerificationState = "verified" | "unverified" | "stale" | "link_only";

type TrailRecord = {
  id: string;
  code: string;
  name: string;
};

type TrailLocation = {
  trailId: string;
  fromNodeId: string;
  toNodeId: string;
  verificationState: VerificationState;
  source: { id: string };
};

type LiftRecord = {
  id: string;
  code: string;
  fromNodeId: string;
  toNodeId: string;
  verificationState: VerificationState;
  source: { id: string };
};

type RoutablePublication = {
  season: string;
  trails: TrailRecord[];
  trailLocations: TrailLocation[];
  lifts: LiftRecord[];
};

export type RouteSegment = {
  kind: "trail" | "lift";
  id: string;
  code: string;
  name?: string;
  fromNodeId: string;
  toNodeId: string;
  verificationState: VerificationState;
  sourceId: string;
};

export type RoutePlan = {
  startTrailId: string;
  destinationTrailId: string;
  season: string;
  verificationState: VerificationState;
  segments: RouteSegment[];
};

function combinedVerificationState(segments: RouteSegment[]): VerificationState {
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

  const liftEdges = publication.lifts.map((lift): RouteSegment => ({
    kind: "lift",
    id: lift.id,
    code: lift.code,
    fromNodeId: lift.fromNodeId,
    toNodeId: lift.toNodeId,
    verificationState: lift.verificationState,
    sourceId: lift.source.id,
  }));

  return [...trailEdges, ...liftEdges];
}

export function planTrailRoute(
  publication: RoutablePublication,
  startTrailId: string,
  destinationTrailId: string,
): RoutePlan | null {
  const edges = routeEdges(publication);
  const start = edges.find((edge) => edge.kind === "trail" && edge.id === startTrailId);
  const destination = edges.find((edge) => edge.kind === "trail" && edge.id === destinationTrailId);
  if (!start || !destination) return null;

  if (start.id === destination.id) {
    return {
      startTrailId,
      destinationTrailId,
      season: publication.season,
      verificationState: start.verificationState,
      segments: [start],
    };
  }

  const middleEdges = edges.filter((edge) => edge.id !== start.id && edge.id !== destination.id);
  const outgoing = new Map<string, RouteSegment[]>();
  for (const edge of middleEdges) {
    const bucket = outgoing.get(edge.fromNodeId) ?? [];
    bucket.push(edge);
    outgoing.set(edge.fromNodeId, bucket);
  }

  type QueueItem = { nodeId: string; segments: RouteSegment[] };
  const queue: QueueItem[] = [{ nodeId: start.toNodeId, segments: [] }];
  const visited = new Set<string>([start.toNodeId]);
  let middle: RouteSegment[] | null = null;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.nodeId === destination.fromNodeId) {
      middle = current.segments;
      break;
    }

    for (const edge of outgoing.get(current.nodeId) ?? []) {
      if (visited.has(edge.toNodeId)) continue;
      visited.add(edge.toNodeId);
      queue.push({ nodeId: edge.toNodeId, segments: [...current.segments, edge] });
    }
  }

  if (!middle) return null;

  const segments = [start, ...middle, destination];
  return {
    startTrailId,
    destinationTrailId,
    season: publication.season,
    verificationState: combinedVerificationState(segments),
    segments,
  };
}
