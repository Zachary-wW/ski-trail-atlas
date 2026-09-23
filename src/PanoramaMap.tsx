import { useEffect, useRef, useState } from "react";

import { appHref } from "./app-paths";
import { publication } from "./data/publication";
import { copy, type Language } from "./i18n";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 650;
const MIN_VIEW_WIDTH = 420;

type ViewBox = { x: number; y: number; width: number; height: number };
type PanoramaMapProps = {
  language: Language;
  selectedTrailId: string;
  autoFocusSelected?: boolean;
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

export function PanoramaMap({ language, selectedTrailId, autoFocusSelected = false }: PanoramaMapProps) {
  const text = copy[language];
  const [view, setView] = useState<ViewBox>(initialView);
  const dragRef = useRef<DragState | null>(null);
  const trailPathRefs = useRef(new Map<string, SVGPathElement>());

  useEffect(() => {
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
  }, [autoFocusSelected, selectedTrailId]);

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
    <section className="panorama-panel" role="region" aria-label={text.mapRegionAria}>
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
            d="M0 474 C118 438 225 386 322 304 C404 235 474 137 525 58 C585 112 650 157 714 207 C806 278 897 345 1000 391 L1000 650 L0 650 Z"
          />
          <path
            className="terrain-face terrain-west"
            d="M0 525 C132 492 256 425 352 332 C427 260 487 167 525 58 C495 226 445 349 366 444 C282 545 162 590 0 614 Z"
          />
          <path
            className="terrain-face terrain-central"
            d="M525 58 C579 170 614 293 600 590 C519 565 441 518 366 444 C445 349 495 226 525 58 Z"
          />
          <path
            className="terrain-face terrain-east"
            d="M525 58 C606 118 702 175 790 245 C878 316 943 361 1000 391 L1000 614 C872 575 735 574 600 590 C614 293 579 170 525 58 Z"
          />
          <path className="ridge-line primary" d="M104 563 C214 451 320 352 406 249 C464 180 503 111 525 58" />
          <path className="ridge-line" d="M525 58 C632 132 731 199 817 286 C878 347 928 409 966 479" />
          <path className="ridge-line secondary" d="M258 342 C359 300 446 272 526 253 C614 232 701 221 800 244" />
          <g className="base-village" aria-hidden="true">
            <rect x="520" y="590" width="62" height="24" />
            <rect x="592" y="579" width="82" height="35" />
            <rect x="684" y="588" width="64" height="26" />
          </g>

          <g className="lift-system" aria-label="Major lift skeleton">
            {publication.lifts.map((lift) => (
              <g key={lift.id} className="map-lift">
                <path
                  className="lift-line"
                  d={lift.path}
                  data-lift-code={lift.code}
                  data-topology-source={lift.source.id}
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
            return (
              <a
                key={trail.id}
                href={appHref(`/trails/${trail.id}`)}
                aria-label={`${trail.code} · ${trail.name}`}
                aria-current={selected ? "page" : undefined}
                className={selected ? "map-trail selected" : "map-trail"}
                data-trail-id={trail.id}
                data-topology-source={location.source.id}
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
