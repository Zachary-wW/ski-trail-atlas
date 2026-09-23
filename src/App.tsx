import { useEffect, useState } from "react";

import { appHref, routePathFromLocation } from "./app-paths";
import { publication } from "./data/publication";
import { copy, languageFromStorage, type Language } from "./i18n";
import { PanoramaMap } from "./PanoramaMap";
import { RoutePlanPanel, RoutePlanner } from "./RoutePlanner";
import type { RoutePlan } from "./routing/plan-trail-route";
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
      <a className="wordmark" href={appHref("/")} aria-label={text.homeAria}>SKI TRAIL ATLAS</a>
      <p className="eyebrow">{text.notFoundEyebrow}</p>
      <h1>{text.notFoundTitle}</h1>
      <p>{text.notFoundBody}</p>
      <a className="home-link" href={appHref("/trails/fulong-a1")}>{text.notFoundLink}</a>
    </main>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(languageFromStorage);
  const [routePlan, setRoutePlan] = useState<RoutePlan | null>(null);
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
    <div className="atlas-shell">
      <header className="atlas-topbar">
        <a className="wordmark" href={appHref("/")} aria-label={text.homeAria}>SKI TRAIL ATLAS</a>
        <div className="atlas-context">
          <span>Fulong · Chongli</span>
          <span>{formatSeason(publication.season, language)}</span>
          <button className="language-toggle" type="button" onClick={toggleLanguage}>{text.switchLanguage}</button>
        </div>
      </header>

      <main className="atlas-stage">
        <div className="atlas-toolbar">
          <TrailCatalog language={language} selectedTrailId={trail.id} />
          <RoutePlanner language={language} selectedTrailId={trail.id} onPlanChange={setRoutePlan} />
        </div>
        <PanoramaMap
          language={language}
          selectedTrailId={trail.id}
          autoFocusSelected={routePath !== "/" && routePath !== ""}
          routePlan={routePlan}
        />
        <RoutePlanPanel language={language} plan={routePlan} />
        <aside className="trail-inspector metrics-panel" aria-labelledby="trail-title">
          <header className="inspector-heading">
            <div className="inspector-kicker">
              <span className={`difficulty-key difficulty-${String(difficulty?.value ?? "unknown")}`} />
              <span>{difficultyLabels[language][String(difficulty?.value)] ?? text.unknownDifficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{text.verification[verificationState]}</span>
            </div>
            <h1 id="trail-title">{trail.code} · {trail.name}</h1>
            <p className="data-note">{text.sourceValueNote}</p>
          </header>
          <dl className="inspector-metrics">
            {metrics.map((metric) => (
              <div className="inspector-metric metric" key={metric.label}>
                <dt>{metric.label}</dt>
                <dd className={metric.value ? "" : "missing"}>{metric.value ?? text.missing}</dd>
              </div>
            ))}
          </dl>
          <div className="inspector-note context-note verification-line"><span className="note-index">01</span><p>{text.slopeDisclaimer}</p></div>
          {primarySource && (
            <div className="inspector-evidence source-card">
              <div><span className="source-label">{text.evidenceEyebrow}</span><strong>{primarySource.publisher}</strong><small>{publication.lastVerifiedAt}</small></div>
              <p>{primarySource.title}</p>
              <dl><div><dt>{text.lastVerified}</dt><dd>{publication.lastVerifiedAt}</dd></div></dl>
              <a aria-label={primarySource.title} href={primarySource.url} target="_blank" rel="noreferrer">{text.referenceSource} ↗</a>
            </div>
          )}
        </aside>
      </main>

      <footer className="atlas-footer">
        <span>{text.footerIndependent}</span>
        <span>{text.footerCheck}</span>
      </footer>
    </div>
  );
}

export default App;
