import { useEffect, useState } from "react";

import { publication } from "./data/publication";
import { copy, type Language } from "./i18n";
import { planTrailRoute, type RoutePlan } from "./routing/plan-trail-route";

type RoutePlannerProps = {
  language: Language;
  selectedTrailId: string;
  onPlanChange: (plan: RoutePlan | null) => void;
};

export function RoutePlanner({ language, selectedTrailId, onPlanChange }: RoutePlannerProps) {
  const text = copy[language];
  const [open, setOpen] = useState(false);
  const [startTrailId, setStartTrailId] = useState(selectedTrailId);
  const [destinationTrailId, setDestinationTrailId] = useState("");
  const [noRoute, setNoRoute] = useState(false);

  useEffect(() => {
    setStartTrailId(selectedTrailId);
  }, [selectedTrailId]);

  const buildRoute = () => {
    if (!startTrailId || !destinationTrailId) return;
    const plan = planTrailRoute(publication, startTrailId, destinationTrailId);
    setNoRoute(!plan);
    onPlanChange(plan);
    if (plan) setOpen(false);
  };

  return (
    <div className="route-planner-control">
      <button
        type="button"
        className="route-toggle"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
          setNoRoute(false);
        }}
      >
        <span aria-hidden="true">↗</span>
        {text.routePlanAction}
      </button>
      {open && (
        <section className="route-popover" role="region" aria-label={text.routePlannerAria}>
          <div className="route-popover-heading">
            <strong>{text.routePlannerTitle}</strong>
            <button type="button" aria-label={text.routeClose} onClick={() => setOpen(false)}>×</button>
          </div>
          <label>
            <span>{text.routeStartTrail}</span>
            <select value={startTrailId} onChange={(event) => setStartTrailId(event.target.value)}>
              {publication.trails.map((trail) => (
                <option key={trail.id} value={trail.id}>{trail.code} · {trail.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{text.routeDestinationTrail}</span>
            <select value={destinationTrailId} onChange={(event) => setDestinationTrailId(event.target.value)}>
              <option value="">{text.routeChooseDestination}</option>
              {publication.trails.map((trail) => (
                <option key={trail.id} value={trail.id}>{trail.code} · {trail.name}</option>
              ))}
            </select>
          </label>
          <button className="route-build" type="button" disabled={!destinationTrailId} onClick={buildRoute}>
            {text.routeBuild}
          </button>
          {noRoute && <p className="route-no-result" role="status">{text.routeNoResult}</p>}
          <p className="route-popover-note">{text.routeCompactDisclaimer}</p>
        </section>
      )}
    </div>
  );
}

export function RoutePlanPanel({ language, plan }: { language: Language; plan: RoutePlan | null }) {
  if (!plan) return null;
  const text = copy[language];
  const start = plan.startEndpoint.kind === "trail" ? publication.trails.find((trail) => trail.id === plan.startEndpoint.id) : undefined;
  const destination = plan.destinationEndpoint.kind === "trail" ? publication.trails.find((trail) => trail.id === plan.destinationEndpoint.id) : undefined;

  return (
    <section className="route-plan-sheet" role="region" aria-label={text.routePlanAria}>
      <header className="route-plan-heading">
        <div>
          <p className="eyebrow">{text.routePlanEyebrow} · {text.verification[plan.verificationState]}</p>
          <h2>{start?.code} → {destination?.code}</h2>
        </div>
        <p>{text.routePlanDisclaimer.replace("{season}", plan.season.replace("-", "–"))}</p>
      </header>
      <ol className="route-steps">
        {plan.segments.map((segment, index) => (
          <li className={`route-step route-${segment.kind}`} key={`${segment.kind}-${segment.id}-${index}`}>
            <span className="route-step-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="route-step-mode" aria-hidden="true">{segment.kind === "transport" ? "↑" : "↓"}</span>
            <span className="route-step-copy">
              <strong>{segment.kind === "trail" && segment.name ? `${segment.code} · ${segment.name}` : segment.code}</strong>
              <small>{segment.kind === "transport" ? text.routeRideLift : text.routeSkiTrail}</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
