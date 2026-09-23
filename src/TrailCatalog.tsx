import { useState } from "react";

import { publication } from "./data/publication";
import { difficultyLabels } from "./trail-labels";

type TrailCatalogProps = {
  selectedTrailId: string;
};

export function TrailCatalog({ selectedTrailId }: TrailCatalogProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingTrails = publication.trails.filter((trail) => {
    if (!normalizedQuery) {
      return true;
    }

    return `${trail.code} ${trail.name}`.toLocaleLowerCase().includes(normalizedQuery);
  });

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow dark">TRAIL CATALOG</p>
          <h2 id="catalog-title">查找雪道</h2>
        </div>
        <label className="trail-search">
          <span>搜索雪道</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入名称或编号，例如 B1"
          />
        </label>
      </div>

      {matchingTrails.length > 0 ? (
        <div className="trail-list" aria-label="富龙雪道目录">
          {matchingTrails.map((trail) => {
            const difficulty = trail.publishedFields.difficulty;
            const slope = trail.publishedFields.averageSlopeDegrees;
            const isSelected = trail.id === selectedTrailId;

            return (
              <a
                className={isSelected ? "trail-card selected" : "trail-card"}
                href={`/trails/${trail.id}`}
                aria-current={isSelected ? "page" : undefined}
                key={trail.id}
              >
                <span className="trail-card-title">{trail.code} · {trail.name}</span>
                <span className="trail-card-meta">
                  {difficultyLabels[String(difficulty?.value)] ?? "难度暂无数据"}
                  <span aria-hidden="true"> · </span>
                  {slope ? `平均 ${slope.value}°` : "坡度暂无数据"}
                </span>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="catalog-empty">没有匹配的雪道</p>
      )}
    </section>
  );
}
