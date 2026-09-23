import { useEffect, useState } from "react";

import { appHref, routePathFromLocation } from "./app-paths";
import { publication } from "./data/publication";
import { copy, languageFromStorage, type Language } from "./i18n";
import { TrailCatalog } from "./TrailCatalog";
import { difficultyLabels } from "./trail-labels";

function formatSeason(season: string, language: Language) {
  return `${season.replace("-", "–")}${copy[language].seasonSuffix}`;
}

function requestedTrailId(routePath: string) {
  if (routePath === "/" || routePath === "") {
    return publication.trails[0]?.id;
  }

  return routePath.match(/^\/trails\/([^/]+)\/?$/)?.[1];
}

function NotFound({ language }: { language: Language }) {
  const text = copy[language];

  return (
    <main className="not-found">
      <a className="brand" href={appHref("/")} aria-label={text.homeAria}>
        <span className="brand-mark" aria-hidden="true">F</span>
        <span>
          <strong>{text.siteName}</strong>
          <small>{text.siteTagline}</small>
        </span>
      </a>
      <p className="eyebrow dark">{text.notFoundEyebrow}</p>
      <h1>{text.notFoundTitle}</h1>
      <p>{text.notFoundBody}</p>
      <a className="home-link" href={appHref("/trails/fulong-a1")}>{text.notFoundLink}</a>
    </main>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(languageFromStorage);
  const text = copy[language];
  const routePath = routePathFromLocation(window.location.pathname, window.location.search);
  const trail = publication.trails.find(
    (candidate) => candidate.id === requestedTrailId(routePath),
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en" ? "Fulong Trail Atlas" : "富龙雪道图鉴";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        language === "en"
          ? "Evidence-backed trail information for Fulong Ski Resort"
          : "富龙滑雪场雪道资料与来源证据",
      );
    window.localStorage.setItem("ski-trail-atlas-language", language);
  }, [language]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("route")) {
      window.history.replaceState(null, "", appHref(routePath));
    }
  }, [routePath]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "zh-CN" : "en"));
  };

  if (!trail) {
    return <NotFound language={language} />;
  }

  const fields = trail.publishedFields;
  const difficulty = fields.difficulty;
  const verificationState = difficulty?.verificationState ?? "unverified";
  const primarySource = fields.averageSlopeDegrees?.source ?? difficulty?.source;
  const metrics = [
    { label: text.length, value: fields.lengthM ? `${fields.lengthM.value} m` : undefined },
    {
      label: text.averageWidth,
      value: fields.averageWidthM ? `${fields.averageWidthM.value} m` : undefined,
    },
    {
      label: text.summitElevation,
      value: fields.summitElevationM ? `${fields.summitElevationM.value} m` : undefined,
    },
    {
      label: text.averageSlope,
      value: fields.averageSlopeDegrees ? `${fields.averageSlopeDegrees.value}°` : undefined,
      featured: true,
    },
    {
      label: text.maximumSlope,
      value: fields.maximumSlopeDegrees ? `${fields.maximumSlopeDegrees.value}°` : undefined,
    },
  ];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href={appHref("/")} aria-label={text.homeAria}>
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>
            <strong>{text.siteName}</strong>
            <small>{text.siteTagline}</small>
          </span>
        </a>
        <div className="topbar-actions">
          <span className="season-pill">{formatSeason(publication.season, language)}</span>
          <button className="language-toggle" type="button" onClick={toggleLanguage}>
            {text.switchLanguage}
          </button>
        </div>
      </header>

      <TrailCatalog language={language} selectedTrailId={trail.id} />

      <main>
        <section className="hero" aria-labelledby="trail-title">
          <div className="contours" aria-hidden="true">
            <svg viewBox="0 0 900 460" role="presentation">
              <path d="M-50 390C110 280 205 342 320 255S520 150 670 203 820 161 940 48" />
              <path d="M-35 432C120 316 220 385 344 292S542 193 687 236 839 199 959 82" />
              <path d="M24 460C169 363 264 417 389 332S578 243 718 280 852 251 947 163" />
              <path d="M376 460C441 401 488 385 543 342S665 301 733 320 846 298 928 240" />
            </svg>
          </div>

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={appHref("/")}>{text.breadcrumbResort}</a>
            <span aria-hidden="true">/</span>
            <span>{text.breadcrumbDetail}</span>
          </nav>

          <div className="hero-content">
            <div>
              <p className="eyebrow">{text.profileEyebrow}</p>
              <h1 id="trail-title">
                {trail.code} <span>·</span> {trail.name}
              </h1>
              <div className="status-row">
                <span className="difficulty-badge">
                  {difficultyLabels[language][String(difficulty?.value)] ?? text.unknownDifficulty}
                </span>
                <span className="verification-badge">
                  <span className="status-dot" aria-hidden="true" />
                  {text.verification[verificationState]}
                </span>
              </div>
            </div>

            <aside className="quick-read" aria-label={text.quickReadLabel}>
              <span>{text.quickReadLabel}</span>
              <strong>{text.quickReadTitle}</strong>
              <p>{text.quickReadBody}</p>
            </aside>
          </div>
        </section>

        <section className="content-grid">
          <article className="panel metrics-panel" aria-labelledby="metrics-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">{text.trailDataEyebrow}</p>
                <h2 id="metrics-title">{text.trailDataTitle}</h2>
              </div>
              <span className="data-note">{text.sourceValueNote}</span>
            </div>

            <dl className="metric-grid">
              {metrics.map((metric) => (
                <div className={metric.featured ? "metric featured" : "metric"} key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd className={metric.value ? "" : "missing"}>{metric.value ?? text.missing}</dd>
                </div>
              ))}
            </dl>

            <div className="context-note">
              <span className="note-icon" aria-hidden="true">i</span>
              <p>{text.slopeDisclaimer}</p>
            </div>
          </article>

          <article className="panel evidence-panel" aria-labelledby="evidence-title">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow dark">{text.evidenceEyebrow}</p>
                <h2 id="evidence-title">{text.evidenceTitle}</h2>
              </div>
              <span className="source-count">{text.oneSource}</span>
            </div>

            {primarySource && (
              <div className="source-card">
                <div className="source-label">{text.referenceSource}</div>
                <a href={primarySource.url} target="_blank" rel="noreferrer">
                  {primarySource.title}
                  <span aria-hidden="true">↗</span>
                </a>
                <p>{primarySource.publisher}</p>
                <dl>
                  <div>
                    <dt>{text.applicableSeason}</dt>
                    <dd>{formatSeason(primarySource.season, language)}</dd>
                  </div>
                  <div>
                    <dt>{text.lastVerified}</dt>
                    <dd>{publication.lastVerifiedAt}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="verification-line">
              <span className="status-dot" aria-hidden="true" />
              <div>
                <strong>{text.verification[verificationState]}</strong>
                <p>{text.verificationBody}</p>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <span>{text.footerIndependent}</span>
        <span>{text.footerCheck}</span>
      </footer>
    </div>
  );
}

export default App;
