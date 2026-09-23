import { useRef, useState } from "react";

import { appHref } from "./app-paths";
import { publication } from "./data/publication";
import { copy, type Language } from "./i18n";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 650;
const MIN_VIEW_WIDTH = 420;

type ViewBox = { x: number; y: number; width: number; height: number };
type PanoramaMapProps = { language: Language; selectedTrailId: string };
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

export function PanoramaMap({ language, selectedTrailId }: PanoramaMapProps) {
  const text = copy[language];
  const [view, setView] = useState<ViewBox>(initialView);
  const dragRef = useRef<DragState | null>(null);

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
            <linearGradient id="mountain-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dce9df" />
              <stop offset="100%" stopColor="#8caa9e" />
            </linearGradient>
            <linearGradient id="foreground-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#183f36" />
              <stop offset="100%" stopColor="#0d2e29" />
            </linearGradient>
          </defs>
          <rect width="1000" height="650" className="map-sky" />
          <circle cx="128" cy="116" r="55" className="map-sun" />
          <path className="mountain back" d="M0 390 L160 208 L262 322 L430 138 L548 296 L706 102 L1000 365 L1000 650 L0 650 Z" />
          <path className="mountain front" d="M0 476 L171 330 L300 420 L469 248 L603 399 L758 218 L1000 402 L1000 650 L0 650 Z" />
          <path className="ridge-line" d="M70 442 C260 375 388 348 512 327 C658 301 786 275 944 230" />
          <g className="base-village" aria-hidden="true">
            <rect x="405" y="574" width="66" height="30" rx="4" />
            <rect x="483" y="586" width="58" height="24" rx="4" />
            <rect x="554" y="578" width="76" height="32" rx="4" />
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
                <path className={`trail-line difficulty-${difficulty}`} d={location.path} />
                <g className="trail-label" transform={`translate(${location.label.x} ${location.label.y})`}>
                  <rect x="-26" y="-14" width="52" height="28" rx="14" />
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
