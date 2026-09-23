import { useEffect, useRef, useState } from "react";

import { appHref } from "./app-paths";
import { publication } from "./data/publication";
import { copy, type Language } from "./i18n";
import { MAP_HEIGHT, MAP_WIDTH, referenceControlNodeIds } from "./map/fulong-reference-frame";
import {
  mapPoint,
  pathFromReferencePoints,
  referenceCalibratedLiftIds,
  referenceCalibratedTrailIds,
  referenceFeatureGeometry,
} from "./map/fulong-reference-geometry";
import type { RoutePlan } from "./routing/plan-trail-route";

const MIN_VIEW_WIDTH = 420;

type ViewBox = { x: number; y: number; width: number; height: number };
type PanoramaMapProps = {
  language: Language;
  selectedTrailId: string;
  autoFocusSelected?: boolean;
  routePlan?: RoutePlan | null;
};
type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  view: ViewBox;
  widthPx: number;
  heightPx: number;
};

const initialView: ViewBox = { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT };

function clampView(view: ViewBox): ViewBox {
  const width = Math.min(MAP_WIDTH, Math.max(MIN_VIEW_WIDTH, view.width));
  const height = width * (MAP_HEIGHT / MAP_WIDTH);
  return {
    width,
    height,
    x: Math.min(MAP_WIDTH - width, Math.max(0, view.x)),
    y: Math.min(MAP_HEIGHT - height, Math.max(0, view.y)),
  };
}

export function PanoramaMap({ language, selectedTrailId, autoFocusSelected = false, routePlan = null }: PanoramaMapProps) {
  const text = copy[language];
  const [view, setView] = useState<ViewBox>(initialView);
  const dragRef = useRef<DragState | null>(null);
  const trailPathRefs = useRef(new Map<string, SVGPathElement>());
  const routeTrailIds = new Set(routePlan?.segments.filter((segment) => segment.kind === "trail").map((segment) => segment.id) ?? []);
  const routeLiftIds = new Set(routePlan?.segments.filter((segment) => segment.kind === "lift").map((segment) => segment.id) ?? []);

  useEffect(() => {
    if (routePlan) {
      setView(initialView);
      return;
    }

    if (!autoFocusSelected) {
      setView(initialView);
      return;
    }

    const path = trailPathRefs.current.get(selectedTrailId);
    if (!path) return;

    const bounds = path.getBBox();
    const padding = 72;
    const aspect = MAP_HEIGHT / MAP_WIDTH;
    const width = Math.max(
      bounds.width + padding * 2,
      (bounds.height + padding * 2) / aspect,
      MIN_VIEW_WIDTH,
    );
    const height = width * aspect;
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;

    setView(
      clampView({
        x: centerX - width / 2,
        y: centerY - height / 2,
        width,
        height,
      }),
    );
  }, [autoFocusSelected, routePlan, selectedTrailId]);

  const zoom = (factor: number) => {
    setView((current) => {
      const nextWidth = current.width * factor;
      const nextHeight = nextWidth * (MAP_HEIGHT / MAP_WIDTH);
      const centerX = current.x + current.width / 2;
      const centerY = current.y + current.height / 2;
      return clampView({
        x: centerX - nextWidth / 2,
        y: centerY - nextHeight / 2,
        width: nextWidth,
        height: nextHeight,
      });
    });
  };

  const pan = (deltaX: number, deltaY: number) => {
    setView((current) => clampView({ ...current, x: current.x + deltaX, y: current.y + deltaY }));
  };

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if ((event.target as Element).closest("a")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      view,
      widthPx: bounds.width,
      heightPx: bounds.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = ((event.clientX - drag.startX) / drag.widthPx) * drag.view.width;
    const dy = ((event.clientY - drag.startY) / drag.heightPx) * drag.view.height;
    setView(clampView({ ...drag.view, x: drag.view.x - dx, y: drag.view.y - dy }));
  };

  const stopDragging = (event: React.PointerEvent<SVGSVGElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = view.width * 0.08;
    if (event.key === "ArrowLeft") pan(-step, 0);
    else if (event.key === "ArrowRight") pan(step, 0);
    else if (event.key === "ArrowUp") pan(0, -step);
    else if (event.key === "ArrowDown") pan(0, step);
    else if (event.key === "+" || event.key === "=") zoom(0.8);
    else if (event.key === "-") zoom(1.25);
    else if (event.key === "Home") setView(initialView);
    else return;
    event.preventDefault();
  };

  const selectedLocation = publication.trailLocations.find(
    (location) => location.trailId === selectedTrailId,
  );

  return (
    <section className={routePlan ? "panorama-panel route-mode" : "panorama-panel"} role="region" aria-label={text.mapRegionAria}>
      <header className="panorama-header">
        <div>
          <p className="eyebrow dark">{text.mapEyebrow}</p>
          <h2>{text.mapTitle}</h2>
        </div>
        <div className="map-controls" aria-label={text.mapTitle}>
          <button type="button" onClick={() => zoom(0.8)} aria-label={text.mapZoomIn}>+</button>
          <button type="button" onClick={() => zoom(1.25)} aria-label={text.mapZoomOut}>−</button>
          <button type="button" onClick={() => setView(initialView)} aria-label={text.mapReset}>↺</button>
        </div>
      </header>

      <div className="panorama-viewport" tabIndex={0} onKeyDown={handleKeyDown} aria-label={text.mapKeyboardHint}>
        <svg
          viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
          aria-label={text.mapCanvasAria}
          data-reference-layout="fulong-highres-2026-09-23"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onWheel={(event) => {
            event.preventDefault();
            zoom(event.deltaY < 0 ? 0.88 : 1.12);
          }}
        >
          <defs>
            <linearGradient id="mountain-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dce5dd" />
              <stop offset="100%" stopColor="#a8b9ad" />
            </linearGradient>
            <linearGradient id="foreground-fill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8da196" />
              <stop offset="100%" stopColor="#6f8a7d" />
            </linearGradient>
          </defs>
          <rect width="1000" height="650" className="map-sky" />
          <circle cx="128" cy="105" r="48" className="map-sun" />
          <path
            className="mountain back"
            d="M0 430 C90 403 170 371 245 326 C335 272 430 172 543 108 C642 151 734 184 826 205 C892 220 950 229 1000 236 L1000 575 L0 575 Z"
          />
          <path
            className="terrain-face terrain-west"
            d="M0 520 C105 486 205 439 300 367 C390 300 474 203 543 108 C471 275 383 375 282 430 C193 478 99 511 0 548 Z"
          />
          <path
            className="terrain-face terrain-central"
            d="M543 108 C590 195 625 296 625 475 C565 465 508 448 452 416 C500 338 531 235 543 108 Z"
          />
          <path
            className="terrain-face terrain-east"
            d="M543 108 C662 156 785 194 1000 236 L1000 530 C872 502 748 486 625 475 C625 296 590 195 543 108 Z"
          />
          <g className="forest-mass" aria-hidden="true">
            <path d="M40 420 C165 380 275 327 375 253 C330 353 233 430 98 481 Z" />
            <path d="M322 284 C395 230 449 179 498 132 C477 234 430 312 363 360 Z" />
            <path d="M604 170 C697 195 770 224 830 269 C763 274 697 257 642 220 Z" />
            <path d="M720 252 C815 235 912 241 991 265 L991 395 C894 365 815 330 750 302 Z" />
            <path d="M656 330 C736 319 812 337 883 383 C804 391 735 381 676 358 Z" />
          </g>
          <path className="ridge-line primary" d="M101 420 C255 337 397 212 543 108" />
          <path className="ridge-line" d="M543 108 C678 161 812 203 951 226" />
          <path className="ridge-line secondary" d="M395 174 C455 188 507 209 562 235 C648 239 734 248 820 282" />
          <g className="base-village" aria-hidden="true">
            <rect x="557" y="448" width="58" height="21" />
            <rect x="624" y="440" width="76" height="29" />
            <rect x="710" y="447" width="64" height="22" />
            <rect x="786" y="452" width="92" height="18" />
          </g>

          <g className="reference-features" aria-label="Reference-only map context">
            {referenceFeatureGeometry.map((feature) => {
              const labelPoint = mapPoint(feature.points[Math.floor(feature.points.length / 2)]);
              return (
                <g key={feature.code} data-reference-feature={feature.code} data-reference-state={feature.state}>
                  <path className={`reference-feature-line state-${feature.state}`} d={pathFromReferencePoints([...feature.points])} />
                  <text className="reference-feature-label" x={labelPoint.x + 8} y={labelPoint.y - 8} aria-hidden="true">
                    {feature.code}
                  </text>
                </g>
              );
            })}
          </g>

          <g className="lift-system" aria-label="Major lift skeleton">
            {publication.lifts.map((lift) => (
              <g key={lift.id} className={routeLiftIds.has(lift.id) ? "map-lift route-active" : "map-lift"}>
                <path
                  className="lift-line"
                  d={lift.path}
                  data-lift-code={lift.code}
                  data-topology-source={lift.source.id}
                  data-layout-fidelity={referenceCalibratedLiftIds.has(lift.id) ? "reference-calibrated" : "legacy-schematic"}
                  data-route-active={routeLiftIds.has(lift.id) ? "true" : undefined}
                />
                <g className="lift-label" transform={`translate(${lift.label.x} ${lift.label.y})`}>
                  <rect x="-16" y="-10" width="32" height="20" />
                  <text textAnchor="middle" dominantBaseline="central">{lift.code}</text>
                </g>
              </g>
            ))}
          </g>

          <g className="topology-nodes" aria-hidden="true">
            {publication.mapNodes.map((node) => (
              <g
                key={node.id}
                className={`topology-node topology-${node.kind}`}
                data-topology-node={node.id}
                data-layout-fidelity={referenceControlNodeIds.has(node.id) ? "reference-calibrated" : "legacy-schematic"}
                transform={`translate(${node.x} ${node.y})`}
              >
                <circle r={node.kind === "junction" ? 4 : 5} />
                {node.label && <text x="9" y="-8">{node.label}</text>}
              </g>
            ))}
          </g>

          {publication.trailLocations.map((location) => {
            const trail = publication.trails.find((candidate) => candidate.id === location.trailId);
            if (!trail) return null;
            const difficulty = String(trail.publishedFields.difficulty?.value ?? "unknown");
            const selected = trail.id === selectedTrailId;
            const routeActive = routeTrailIds.has(trail.id);
            const className = ["map-trail", selected ? "selected" : "", routeActive ? "route-active" : ""].filter(Boolean).join(" ");
            return (
              <a
                key={trail.id}
                href={appHref(`/trails/${trail.id}`)}
                aria-label={`${trail.code} · ${trail.name}`}
                aria-current={selected ? "page" : undefined}
                className={className}
                data-trail-id={trail.id}
                data-topology-source={location.source.id}
                data-layout-fidelity={referenceCalibratedTrailIds.has(trail.id) ? "reference-calibrated" : "legacy-schematic"}
                data-route-active={routeActive ? "true" : undefined}
              >
                <path className="trail-hit-target" d={location.path} />
                <path
                  ref={(node) => {
                    if (node) trailPathRefs.current.set(trail.id, node);
                    else trailPathRefs.current.delete(trail.id);
                  }}
                  className={`trail-line difficulty-${difficulty}`}
                  d={location.path}
                />
                <g className="trail-label" transform={`translate(${location.label.x} ${location.label.y})`}>
                  <rect x="-21" y="-12" width="42" height="24" rx="6" />
                  <text textAnchor="middle" dominantBaseline="central">{trail.code}</text>
                </g>
              </a>
            );
          })}
        </svg>
      </div>

      <div className="panorama-meta">
        <span>{publication.season.replace("-", "–")}</span>
        <span>{publication.lastVerifiedAt}</span>
        <span>{text.mapVerification}</span>
        {selectedLocation && (
          <a href={selectedLocation.source.url} target="_blank" rel="noreferrer">
            {text.mapEvidence} ↗
          </a>
        )}
      </div>
      <p className="map-disclaimer">{text.mapDisclaimer}</p>
    </section>
  );
}
