import { z } from "zod";

const sourceSnapshotSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.url(),
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

const claimSchema = z.object({
  id: z.string().min(1),
  trailId: z.string().min(1),
  field: z.enum([
    "difficulty",
    "lengthM",
    "averageWidthM",
    "summitElevationM",
    "averageSlopeDegrees",
    "maximumSlopeDegrees",
  ]),
  value: z.union([z.string(), z.number()]),
  unit: z.string().min(1).optional(),
  sourceSnapshotId: z.string().min(1),
  verificationState: z.enum(["verified", "unverified", "stale", "link_only"]),
});

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

  const sourceById = new Map(
    researchPackage.sourceSnapshots.map((source) => [source.id, source]),
  );
  const trailIds = new Set(researchPackage.trails.map((trail) => trail.id));

  for (const claim of researchPackage.claims) {
    if (!trailIds.has(claim.trailId)) {
      throw new Error(`Claim ${claim.id} references missing Trail ${claim.trailId}`);
    }

    if (!sourceById.has(claim.sourceSnapshotId)) {
      throw new Error(`Claim ${claim.id} references missing source ${claim.sourceSnapshotId}`);
    }
  }

  return {
    schemaVersion: researchPackage.schemaVersion,
    resort: researchPackage.resort,
    season: researchPackage.season,
    lastVerifiedAt: researchPackage.lastVerifiedAt,
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
          ...(claim.unit ? { unit: claim.unit } : {}),
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
