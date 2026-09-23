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

  it("publishes an evidence-backed Trail Location for the Panorama Map", () => {
    const publication = compilePublication({
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Fulong trail panorama",
          url: "https://example.com/map",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [],
      mapNodes: [
        { id: "trail-top", kind: "junction", x: 100, y: 80, sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "trail-bottom", kind: "junction", x: 100, y: 200, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      trailLocations: [
        {
          trailId: "fulong-a1",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
          path: "M 100 200 C 140 160 170 120 200 80",
          fromNodeId: "trail-top",
          toNodeId: "trail-bottom",
          label: { x: 160, y: 130 },
        },
      ],
    });

    expect(publication.trailLocations).toEqual([
      expect.objectContaining({
        trailId: "fulong-a1",
        verificationState: "unverified",
        path: "M 100 200 C 140 160 170 120 200 80",
        fromNodeId: "trail-top",
        toNodeId: "trail-bottom",
        source: expect.objectContaining({ id: "map-source" }),
      }),
    ]);
  });

  it("rejects a Trail Location whose topology source is missing", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [],
      trailLocations: [
        {
          trailId: "fulong-a1",
          sourceSnapshotId: "missing-map-source",
          verificationState: "unverified",
          path: "M 0 0 L 10 10",
          label: { x: 5, y: 5 },
        },
      ],
    };

    expect(() => compilePublication(input)).toThrow(/Trail Location.*missing source/i);
  });

  it("rejects a Trail Location whose Trail is missing", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Map source",
          url: "https://example.com/map",
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
      trailLocations: [
        {
          trailId: "missing-trail",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
          path: "M 0 0 L 10 10",
          label: { x: 5, y: 5 },
        },
      ],
    };

    expect(() => compilePublication(input)).toThrow(/Trail Location.*missing Trail/i);
  });

  it("rejects duplicate Trail Locations for the same Trail", () => {
    const location = {
      trailId: "fulong-a1",
      fromNodeId: "top",
      toNodeId: "bottom",
      sourceSnapshotId: "map-source",
      verificationState: "unverified",
      path: "M 0 0 L 10 10",
      label: { x: 5, y: 5 },
    } as const;
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-22",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Map source",
          url: "https://example.com/map",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-22",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [],
      trailLocations: [location, { ...location, path: "M 1 1 L 9 9" }],
      mapNodes: [
        { id: "top", kind: "junction", x: 0, y: 0, sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "bottom", kind: "junction", x: 10, y: 10, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
    };

    expect(() => compilePublication(input)).toThrow(/Duplicate Trail Location/i);
  });

  it("publishes evidence-backed topology nodes, Transport Stations, Places, and Uphill Transport", () => {
    const publication = compilePublication({
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Fulong panorama",
          url: "https://example.com/map",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-23",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [],
      claims: [],
      mapNodes: [
        { id: "l3-base", kind: "transport_station", x: 160, y: 520, sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "l3-top", kind: "transport_station", x: 690, y: 90, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      transportStations: [
        {
          id: "fulong-l3-bottom",
          transportId: "fulong-l3",
          nodeId: "l3-base",
          role: "bottom",
          name: "L3 Bottom",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
        {
          id: "fulong-l3-top",
          transportId: "fulong-l3",
          nodeId: "l3-top",
          role: "top",
          name: "L3 Top",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
      places: [
        {
          id: "west-base-place",
          name: "West Base",
          nodeId: "l3-base",
          kind: "base",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
      uphillTransports: [
        {
          id: "fulong-l3",
          code: "L3",
          transportType: "gondola",
          bottomStationId: "fulong-l3-bottom",
          topStationId: "fulong-l3-top",
          transportTypeSourceSnapshotId: "map-source",
          path: "M 160 520 L 690 90",
          label: { x: 330, y: 375 },
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
    });

    expect(publication.mapNodes).toEqual([
      expect.objectContaining({ id: "l3-base", source: expect.objectContaining({ id: "map-source" }) }),
      expect.objectContaining({ id: "l3-top", source: expect.objectContaining({ id: "map-source" }) }),
    ]);
    expect(publication.transportStations).toEqual([
      expect.objectContaining({ id: "fulong-l3-bottom", nodeId: "l3-base", role: "bottom" }),
      expect.objectContaining({ id: "fulong-l3-top", nodeId: "l3-top", role: "top" }),
    ]);
    expect(publication.places).toEqual([
      expect.objectContaining({ id: "west-base-place", nodeId: "l3-base", kind: "base" }),
    ]);
    expect(publication.uphillTransports).toEqual([
      expect.objectContaining({
        id: "fulong-l3",
        code: "L3",
        transportType: "gondola",
        bottomStation: expect.objectContaining({ nodeId: "l3-base" }),
        topStation: expect.objectContaining({ nodeId: "l3-top" }),
      }),
    ]);
  });

  it("rejects a Transport Station whose topology node is missing", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Map source",
          url: "https://example.com/map",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-23",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [],
      claims: [],
      mapNodes: [
        { id: "l3-base", kind: "transport_station", x: 160, y: 520, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      transportStations: [
        {
          id: "fulong-l3-bottom",
          transportId: "fulong-l3",
          nodeId: "missing-bottom",
          role: "bottom",
          name: "L3 Bottom",
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
      uphillTransports: [
        {
          id: "fulong-l3",
          code: "L3",
          transportType: "gondola",
          bottomStationId: "fulong-l3-bottom",
          topStationId: "fulong-l3-bottom",
          transportTypeSourceSnapshotId: "map-source",
          path: "M 160 520 L 690 90",
          label: { x: 330, y: 375 },
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(input)).toThrow(/Transport Station.*missing topology node/i);
  });

  it("rejects an Uphill Transport whose Transport Type source is missing", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [
        {
          id: "map-source",
          title: "Map source",
          url: "https://example.com/map",
          publisher: "Publisher",
          publishedAt: "2026-01-01",
          retrievedAt: "2026-09-23",
          season: "2025-2026",
          sourceClass: "secondary_commercial",
          permittedUse: "reference_only",
        },
      ],
      trails: [],
      claims: [],
      mapNodes: [
        { id: "l3-base", kind: "transport_station", x: 160, y: 520, sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "l3-top", kind: "transport_station", x: 690, y: 90, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      transportStations: [
        { id: "fulong-l3-bottom", transportId: "fulong-l3", nodeId: "l3-base", role: "bottom", name: "L3 Bottom", sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "fulong-l3-top", transportId: "fulong-l3", nodeId: "l3-top", role: "top", name: "L3 Top", sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      uphillTransports: [
        {
          id: "fulong-l3",
          code: "L3",
          transportType: "gondola",
          bottomStationId: "fulong-l3-bottom",
          topStationId: "fulong-l3-top",
          transportTypeSourceSnapshotId: "missing-type-source",
          path: "M 160 520 L 690 90",
          label: { x: 330, y: 375 },
          sourceSnapshotId: "map-source",
          verificationState: "unverified",
        },
      ],
    };

    expect(() => compilePublication(input)).toThrow(/missing Transport Type source/i);
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

  it("preserves source-reported mixed and park difficulty categories", () => {
    const base = {
      schemaVersion: "1.0.0" as const,
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [{
        id: "source-1",
        title: "Source",
        url: "https://example.com/source",
        publisher: "Publisher",
        publishedAt: "2026-01-01",
        retrievedAt: "2026-09-23",
        season: "2025-2026",
        sourceClass: "secondary_commercial" as const,
        permittedUse: "reference_only" as const,
      }],
      claims: [],
    };

    for (const difficulty of ["beginner_intermediate", "park", "intermediate_advanced"] as const) {
      const publication = compilePublication({
        ...base,
        trails: [{ id: `trail-${difficulty}`, code: difficulty, name: difficulty }],
        claims: [{
          id: `claim-${difficulty}`,
          trailId: `trail-${difficulty}`,
          field: "difficulty",
          value: difficulty,
          sourceSnapshotId: "source-1",
          verificationState: "unverified",
        }],
      });
      expect(publication.trails[0]?.publishedFields.difficulty?.value).toBe(difficulty);
    }
  });

  it("rejects a Trail Location without routable topology endpoints", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [{
        id: "map-source",
        title: "Map source",
        url: "https://example.com/map",
        publisher: "Publisher",
        publishedAt: "2026-01-01",
        retrievedAt: "2026-09-23",
        season: "2025-2026",
        sourceClass: "secondary_commercial",
        permittedUse: "reference_only",
      }],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [],
      mapNodes: [
        { id: "top", kind: "junction", x: 0, y: 0, sourceSnapshotId: "map-source", verificationState: "unverified" },
        { id: "bottom", kind: "junction", x: 10, y: 10, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      trailLocations: [{
        trailId: "fulong-a1",
        sourceSnapshotId: "map-source",
        verificationState: "unverified",
        path: "M 0 0 L 10 10",
        label: { x: 5, y: 5 },
      }],
    };

    expect(() => compilePublication(input)).toThrow(/fromNodeId|toNodeId|endpoint/i);
  });

  it("rejects a Trail Location whose endpoint node is missing", () => {
    const input = {
      schemaVersion: "1.0.0",
      resort: { id: "fulong", name: "富龙滑雪场" },
      season: "2025-2026",
      lastVerifiedAt: "2026-09-23",
      sourceSnapshots: [{
        id: "map-source",
        title: "Map source",
        url: "https://example.com/map",
        publisher: "Publisher",
        publishedAt: "2026-01-01",
        retrievedAt: "2026-09-23",
        season: "2025-2026",
        sourceClass: "secondary_commercial",
        permittedUse: "reference_only",
      }],
      trails: [{ id: "fulong-a1", code: "A1", name: "蓝调" }],
      claims: [],
      mapNodes: [
        { id: "top", kind: "junction", x: 0, y: 0, sourceSnapshotId: "map-source", verificationState: "unverified" },
      ],
      trailLocations: [{
        trailId: "fulong-a1",
        fromNodeId: "top",
        toNodeId: "missing-bottom",
        sourceSnapshotId: "map-source",
        verificationState: "unverified",
        path: "M 0 0 L 10 10",
        label: { x: 5, y: 5 },
      }],
    };

    expect(() => compilePublication(input)).toThrow(/Trail Location.*missing topology node/i);
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
