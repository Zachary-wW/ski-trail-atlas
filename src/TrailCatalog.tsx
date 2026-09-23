import { useState } from "react";

import { appHref } from "./app-paths";
import { publication } from "./data/publication";
import { copy, type Language } from "./i18n";
import { difficultyLabels } from "./trail-labels";

type TrailCatalogProps = {
  language: Language;
  selectedTrailId: string;
};

export function TrailCatalog({ language, selectedTrailId }: TrailCatalogProps) {
  const [query, setQuery] = useState("");
  const text = copy[language];
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
          <p className="eyebrow dark">{text.catalogEyebrow}</p>
          <h2 id="catalog-title">{text.catalogTitle}</h2>
        </div>
        <label className="trail-search">
          <span>{text.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.searchPlaceholder}
          />
        </label>
      </div>

      {matchingTrails.length > 0 ? (
        <div className="trail-list" aria-label={text.catalogAria}>
          {matchingTrails.map((trail) => {
            const difficulty = trail.publishedFields.difficulty;
            const slope = trail.publishedFields.averageSlopeDegrees;
            const isSelected = trail.id === selectedTrailId;

            return (
              <a
                className={isSelected ? "trail-card selected" : "trail-card"}
                href={appHref(`/trails/${trail.id}`)}
                aria-current={isSelected ? "page" : undefined}
                key={trail.id}
              >
                <span className="trail-card-title">{trail.code} · {trail.name}</span>
                <span className="trail-card-meta">
                  {difficultyLabels[language][String(difficulty?.value)] ?? text.unknownDifficulty}
                  <span aria-hidden="true"> · </span>
                  {slope ? `${text.averageSlopePrefix}${slope.value}°` : text.slopeUnavailable}
                </span>
              </a>
            );
          })}
        </div>
      ) : (
        <p className="catalog-empty">{text.noMatches}</p>
      )}
    </section>
  );
}
