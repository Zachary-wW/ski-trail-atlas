import { describe, expect, it } from "vitest";

import { compilePublication } from "../../src/content/compile-publication";

describe("compilePublication", () => {
  it("publishes a Trail together with its source evidence", () => {
    const publication = compilePublication({
      schemaVersion: "1.0.0",
      resort: {
        id: "fulong",
        name: "富龙滑雪场",
      },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "chonglihuaxue-167",
          title: "崇礼富龙滑雪场雪道参数及雪道总览图",
          url: "https://www.chonglihuaxue.cn/info.asp?id=167",
          publisher: "张家口帝和旅游有限公司",
          publishedAt: "2026-06-11",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [
        {
          id: "fulong-a1",
          code: "A1",
          name: "蓝调",
        },
      ],
      claims: [
        {
          id: "fulong-a1-difficulty",
          trailId: "fulong-a1",
          field: "difficulty",
          value: "beginner",
          sourceSnapshotId: "chonglihuaxue-167",
          verificationState: "unverified",
        },
        {
          id: "fulong-a1-average-slope",
          trailId: "fulong-a1",
          field: "averageSlopeDegrees",
          value: 7,
          unit: "degree",
          sourceSnapshotId: "chonglihuaxue-167",
          verificationState: "unverified",
        },
      ],
    });

    expect(publication.trails).toEqual([
      expect.objectContaining({
        id: "fulong-a1",
        code: "A1",
        name: "蓝调",
        publishedFields: {
          averageSlopeDegrees: expect.objectContaining({
            value: 7,
            unit: "degree",
            verificationState: "unverified",
            source: expect.objectContaining({
              title: "崇礼富龙滑雪场雪道参数及雪道总览图",
              url: "https://www.chonglihuaxue.cn/info.asp?id=167",
            }),
          }),
          difficulty: expect.objectContaining({
            value: "beginner",
            verificationState: "unverified",
          }),
        },
      }),
    ]);
  });

  it("rejects duplicate Trail identifiers", () => {
    const duplicateTrails = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [],
      trails: [
        { id: "fulong-a1", code: "A1", name: "蓝调" },
        { id: "fulong-a1", code: "A1-copy", name: "蓝调副本" },
      ],
      claims: [],
    };

    expect(() => compilePublication(duplicateTrails)).toThrow(/duplicate Trail id/i);
  });

  it("rejects a Claim whose source evidence is missing", () => {
    const missingSource = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [
        {
          id: "fulong-a1-difficulty",
          trailId: "fulong-a1",
          field: "difficulty",
          value: "beginner",
          sourceSnapshotId: "missing-source",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(missingSource)).toThrow(/references missing source/i);
  });

  it("rejects a Claim whose Trail is missing", () => {
    const missingTrail = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "source-1",
          title: "Source",
          url: "https://example.com/source",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [],
      claims: [
        {
          id: "orphan-claim",
          trailId: "missing-trail",
          field: "difficulty",
          value: "beginner",
          sourceSnapshotId: "source-1",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(missingTrail)).toThrow(/references missing Trail/i);
  });

  it("rejects multiple Claims for the same published field", () => {
    const ambiguousField = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "source-1",
          title: "Source",
          url: "https://example.com/source",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [
        {
          id: "slope-1",
          trailId: "fulong-a1",
          field: "averageSlopeDegrees",
          value: 7,
          unit: "degree",
          sourceSnapshotId: "source-1",
          verificationState: "unverified",
        },
        {
          id: "slope-2",
          trailId: "fulong-a1",
          field: "averageSlopeDegrees",
          value: 8,
          unit: "degree",
          sourceSnapshotId: "source-1",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(ambiguousField)).toThrow(/multiple Claims/i);
  });

  it("rejects a value whose type does not match its Claim field", () => {
    const invalidSlope = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "source-1",
          title: "Source",
          url: "https://example.com/source",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [
        {
          id: "invalid-slope",
          trailId: "fulong-a1",
          field: "averageSlopeDegrees",
          value: "steep",
          unit: "degree",
          sourceSnapshotId: "source-1",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(invalidSlope)).toThrow();
  });

  it("rejects non-HTTP source URLs", () => {
    const unsafeSource = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "source-1",
          title: "Unsafe source",
          url: "javascript:alert(document.domain)",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [],
      claims: [],
    };

    expect(() => compilePublication(unsafeSource)).toThrow(/HTTP/i);
  });
});
