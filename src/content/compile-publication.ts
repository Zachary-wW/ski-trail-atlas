import { z } from "zod";

const sourceSnapshotSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.url().refine(
    (value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    },
    { message: "Source URL must use HTTP or HTTPS" },
  ),
  publisher: z.string().min(1),
  publishedAt: z.iso.date(),
  retrievedAt: z.iso.date(),
  season: z.string().min(1),
  sourceClass: z.enum([
    "official_resort",
    "government",
    "institutional",
    "secondary_commercial",
    "open_data",
    "community",
  ]),
  permittedUse: z.enum(["reference_only", "permission_granted", "open_license"]),
});

const trailSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  name: z.string().min(1),
});

const verificationStateSchema = z.enum(["verified", "unverified", "stale", "link_only"]);

const evidenceReferenceFields = {
  sourceSnapshotId: z.string().min(1),
  verificationState: verificationStateSchema,
};

const mapNodeSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["lift_station", "junction", "base", "zone_anchor"]),
  x: z.number(),
  y: z.number(),
  label: z.string().min(1).optional(),
  ...evidenceReferenceFields,
});

const liftSchema = z.object({
  id: z.string().min(1),
  code: z.string().min(1),
  fromNodeId: z.string().min(1),
  toNodeId: z.string().min(1),
  path: z.string().min(1),
  label: z.object({
    x: z.number(),
    y: z.number(),
  }),
  ...evidenceReferenceFields,
});

const trailLocationSchema = z.object({
  trailId: z.string().min(1),
  fromNodeId: z.string().min(1).optional(),
  toNodeId: z.string().min(1).optional(),
  ...evidenceReferenceFields,
  path: z.string().min(1),
  label: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

const claimBase = {
  id: z.string().min(1),
  trailId: z.string().min(1),
  sourceSnapshotId: z.string().min(1),
  verificationState: verificationStateSchema,
};

const claimSchema = z.discriminatedUnion("field", [
  z
    .object({
      ...claimBase,
      field: z.literal("difficulty"),
      value: z.enum([
        "beginner",
        "beginner_intermediate",
        "park",
        "intermediate",
        "intermediate_advanced",
        "advanced",
      ]),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      field: z.literal("lengthM"),
      value: z.number().nonnegative(),
      unit: z.literal("m"),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      field: z.literal("averageWidthM"),
      value: z.number().nonnegative(),
      unit: z.literal("m"),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      field: z.literal("summitElevationM"),
      value: z.number().nonnegative(),
      unit: z.literal("m"),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      field: z.literal("averageSlopeDegrees"),
      value: z.number().min(0).max(90),
      unit: z.literal("degree"),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      field: z.literal("maximumSlopeDegrees"),
      value: z.number().min(0).max(90),
      unit: z.literal("degree"),
    })
    .strict(),
]);

const researchPackageSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  resort: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
  season: z.string().min(1),
  lastVerifiedAt: z.iso.date(),
  sourceSnapshots: z.array(sourceSnapshotSchema),
  trails: z.array(trailSchema),
  claims: z.array(claimSchema),
  trailLocations: z.array(trailLocationSchema).default([]),
  mapNodes: z.array(mapNodeSchema).default([]),
  lifts: z.array(liftSchema).default([]),
});

type PublishedField = {
  value: string | number;
  unit?: string;
  verificationState: z.infer<typeof claimSchema>["verificationState"];
  source: z.infer<typeof sourceSnapshotSchema>;
};

function assertUniqueIds(items: Array<{ id: string }>, label: string) {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Duplicate ${label} id: ${item.id}`);
    }

    seen.add(item.id);
  }
}

export function compilePublication(input: unknown) {
  const researchPackage = researchPackageSchema.parse(input);

  assertUniqueIds(researchPackage.sourceSnapshots, "Source Snapshot");
  assertUniqueIds(researchPackage.trails, "Trail");
  assertUniqueIds(researchPackage.claims, "Claim");
  assertUniqueIds(researchPackage.mapNodes, "Map Node");
  assertUniqueIds(researchPackage.lifts, "Lift");

  const sourceById = new Map(
    researchPackage.sourceSnapshots.map((source) => [source.id, source]),
  );
  const trailIds = new Set(researchPackage.trails.map((trail) => trail.id));
  const mapNodeIds = new Set(researchPackage.mapNodes.map((node) => node.id));

  for (const claim of researchPackage.claims) {
    if (!trailIds.has(claim.trailId)) {
      throw new Error(`Claim ${claim.id} references missing Trail ${claim.trailId}`);
    }

    if (!sourceById.has(claim.sourceSnapshotId)) {
      throw new Error(`Claim ${claim.id} references missing source ${claim.sourceSnapshotId}`);
    }
  }

  const locatedTrailIds = new Set<string>();

  for (const location of researchPackage.trailLocations) {
    if (!trailIds.has(location.trailId)) {
      throw new Error(`Trail Location references missing Trail ${location.trailId}`);
    }

    if (!sourceById.has(location.sourceSnapshotId)) {
      throw new Error(`Trail Location for ${location.trailId} references missing source ${location.sourceSnapshotId}`);
    }

    if (locatedTrailIds.has(location.trailId)) {
      throw new Error(`Duplicate Trail Location for ${location.trailId}`);
    }

    locatedTrailIds.add(location.trailId);

    if (!location.fromNodeId || !location.toNodeId) {
      throw new Error(`Trail Location for ${location.trailId} requires fromNodeId and toNodeId endpoints`);
    }

    if (!mapNodeIds.has(location.fromNodeId) || !mapNodeIds.has(location.toNodeId)) {
      throw new Error(`Trail Location for ${location.trailId} references missing topology node`);
    }
  }

  for (const node of researchPackage.mapNodes) {
    if (!sourceById.has(node.sourceSnapshotId)) {
      throw new Error(`Map Node ${node.id} references missing source ${node.sourceSnapshotId}`);
    }
  }

  for (const lift of researchPackage.lifts) {
    if (!sourceById.has(lift.sourceSnapshotId)) {
      throw new Error(`Lift ${lift.id} references missing source ${lift.sourceSnapshotId}`);
    }

    if (!mapNodeIds.has(lift.fromNodeId) || !mapNodeIds.has(lift.toNodeId)) {
      throw new Error(`Lift ${lift.id} references missing topology node`);
    }
  }

  return {
    schemaVersion: researchPackage.schemaVersion,
    resort: researchPackage.resort,
    season: researchPackage.season,
    lastVerifiedAt: researchPackage.lastVerifiedAt,
    mapNodes: researchPackage.mapNodes.map((node) => {
      const source = sourceById.get(node.sourceSnapshotId);
      if (!source) throw new Error(`Map Node ${node.id} references missing source ${node.sourceSnapshotId}`);
      return { ...node, source };
    }),
    lifts: researchPackage.lifts.map((lift) => {
      const source = sourceById.get(lift.sourceSnapshotId);
      if (!source) throw new Error(`Lift ${lift.id} references missing source ${lift.sourceSnapshotId}`);
      return { ...lift, source };
    }),
    trailLocations: researchPackage.trailLocations.map((location) => {
      const source = sourceById.get(location.sourceSnapshotId);

      if (!source) {
        throw new Error(
          `Trail Location for ${location.trailId} references missing source ${location.sourceSnapshotId}`,
        );
      }

      if (!location.fromNodeId || !location.toNodeId) {
        throw new Error(`Trail Location for ${location.trailId} requires topology endpoints`);
      }

      return {
        trailId: location.trailId,
        fromNodeId: location.fromNodeId,
        toNodeId: location.toNodeId,
        verificationState: location.verificationState,
        path: location.path,
        label: location.label,
        source,
      };
    }),
    trails: researchPackage.trails.map((trail) => {
      const publishedFields: Record<string, PublishedField> = {};

      for (const claim of researchPackage.claims.filter(
        (candidate) => candidate.trailId === trail.id,
      )) {
        const source = sourceById.get(claim.sourceSnapshotId);

        if (!source) {
          throw new Error(`Claim ${claim.id} references missing source ${claim.sourceSnapshotId}`);
        }

        if (publishedFields[claim.field]) {
          throw new Error(
            `Multiple Claims target ${trail.id}.${claim.field}; resolve the conflict before publication`,
          );
        }

        publishedFields[claim.field] = {
          value: claim.value,
          ...("unit" in claim ? { unit: claim.unit } : {}),
          verificationState: claim.verificationState,
          source,
        };
      }

      return {
        ...trail,
        publishedFields,
      };
    }),
  };
}
