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
      <header className="catalog-heading">
        <div>
          <p className="eyebrow">{text.catalogEyebrow}</p>
          <h2 id="catalog-title">{text.catalogTitle}</h2>
        </div>
        <span className="catalog-count">{publication.trails.length.toString().padStart(2, "0")}</span>
      </header>

      <label className="trail-search">
        <span>{text.searchLabel}</span>
        <div className="search-field">
          <span className="search-glyph" aria-hidden="true">⌕</span>
          <input
            type="search"
            name="trail-search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.searchPlaceholder}
          />
        </div>
      </label>

      {matchingTrails.length > 0 ? (
        <nav className="trail-list" aria-label={text.catalogAria}>
          {matchingTrails.map((trail) => {
            const difficulty = trail.publishedFields.difficulty;
            const slope = trail.publishedFields.averageSlopeDegrees;
            const isSelected = trail.id === selectedTrailId;

            return (
              <a
                className={isSelected ? "trail-row selected" : "trail-row"}
                href={appHref(`/trails/${trail.id}`)}
                aria-label={`${trail.code} · ${trail.name}`}
                aria-current={isSelected ? "page" : undefined}
                key={trail.id}
              >
                <span className={`trail-code difficulty-${String(difficulty?.value ?? "unknown")}`}>{trail.code}</span>
                <span className="trail-name">
                  <strong>{trail.name}</strong>
                  <small>{difficultyLabels[language][String(difficulty?.value)] ?? text.unknownDifficulty} · {slope ? `${slope.value}°` : text.slopeUnavailable}</small>
                </span>
                <span className="trail-slope">{slope ? `AVG ${slope.value}°` : "—"}</span>
              </a>
            );
          })}
        </nav>
      ) : (
        <p className="catalog-empty">{text.noMatches}</p>
      )}
      <p className="catalog-footnote">{text.mapDisclaimer}</p>
    </section>
  );
}
