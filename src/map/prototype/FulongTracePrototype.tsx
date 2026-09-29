import { useEffect, useRef, useState } from "react";
import {
  findPilotRoute, nodes, reference, referenceFeatures, repeatedLabels, sectors,
  segmentPath, segments, trails, transports, userCorrections, type NodeId, type SectorId, type Point,
} from "./fulong-trace-data";
import "./east-trace-prototype.css";

// One fixed layout, three inspection modes. The user asked to validate source
// fidelity, not to explore alternative mountain compositions or page layouts.
type Mode = "overlay" | "reference" | "redraw";
type View = { x: number; y: number; width: number; height: number };
const modes: { key: Mode; name: string; description: string }[] = [
  { key: "overlay", name: "叠加校准", description: "原图与描摹共用原始像素坐标" },
  { key: "reference", name: "高清原图", description: "查看原始图示，按住对照按钮可临时切换" },
  { key: "redraw", name: "独立线稿", description: "隐藏原图，检查结构与路线连续性" },
];

// One symbol per physical station, painted after every cable. Shared terminals
// must not accumulate opaque squares or be erased by the next transport path.
const terminalStations = new Map<string, { point: Point; codes: string[] }>();
for (const transport of transports) {
  for (const point of [transport.bottom, transport.top]) {
    if (!point) continue;
    const key = `${point.x},${point.y}`;
    const station = terminalStations.get(key) ?? { point, codes: [] };
    if (!station.codes.includes(transport.code)) station.codes.push(transport.code);
    terminalStations.set(key, station);
  }
}

function clamp(view: View): View {
  const width = Math.max(360, Math.min(reference.frame.width, view.width));
  const height = Math.min(reference.frame.height, width * view.height / view.width);
  return {
    width, height,
    x: Math.min(reference.frame.x + reference.frame.width - width, Math.max(reference.frame.x, view.x)),
    y: Math.min(reference.frame.y + reference.frame.height - height, Math.max(reference.frame.y, view.y)),
  };
}

type FulongTracePrototypeProps = {
  published?: boolean;
};

export default function FulongTracePrototype({ published = false }: FulongTracePrototypeProps) {
  const initialSector: SectorId = new URLSearchParams(location.search).get("prototype") === "east-trace" ? "east" : "all";
  const [sector, setSector] = useState<SectorId>(initialSector);
  const [mode, setMode] = useState<Mode>(published ? "redraw" : "overlay");
  const [opacity, setOpacity] = useState(0.68);
  const [selected, setSelected] = useState("B10");
  const [showNodes, setShowNodes] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [seeThrough, setSeeThrough] = useState(true);
  const [compare, setCompare] = useState(false);
  const [view, setView] = useState<View>(sectors[initialSector].frame);
  const [imageFailed, setImageFailed] = useState(false);
  const [start, setStart] = useState<NodeId>("ridge");
  const [end, setEnd] = useState<NodeId>("teaching");
  const [route, setRoute] = useState<ReturnType<typeof findPilotRoute>>(null);
  const [routeRequested, setRouteRequested] = useState(false);
  const drag = useRef<{ pointer: number; x: number; y: number; view: View; scale: number } | null>(null);
  const activeMode: Mode = published ? "redraw" : compare ? "reference" : mode;
  const marks = [...trails, ...referenceFeatures];
  const selectedMark = marks.find((mark) => mark.code === selected)!;
  const selectedSegments = segments.filter((segment) => segment.trail === selected || segment.featureCode === selected);
  const pendingSegments = segments.filter((segment) => segment.id === "upper-entry-link" && ["B5", "B6", "B7"].includes(selected));
  const visibleTrails = trails.filter((trail) => sector === "all" || trail.sector === sector
    || (sector === "annotation" && ["B10", "B11", "B9", "B8", "B12", "B13", "B15"].includes(trail.code))
    || (trail.code === "C3" && sector === "west"));
  const labelScale = Math.max(0.8, view.width / 1300);
  const routeIds = new Set(route?.map((segment) => segment.id) ?? []);

  useEffect(() => {
    document.documentElement.lang = "zh-CN";
    document.title = published ? "富龙雪道地图 · Ski Trail Atlas" : "富龙制图工作台";
  }, [published]);

  function chooseSector(next: SectorId) {
    setSector(next);
    setView(sectors[next].frame);
    resetRoute();
  }

  function selectMark(code: string) {
    setSelected(code);
    const mark = marks.find((item) => item.code === code)!;
    if (sector === "all" && mark.label) {
      setSector(mark.sector);
      setView(sectors[mark.sector].frame);
    }
  }

  function zoom(factor: number) {
    setView((current) => {
      const width = current.width * factor;
      const height = width * current.height / current.width;
      return clamp({ x: current.x + (current.width - width) / 2,
        y: current.y + (current.height - height) / 2, width, height });
    });
  }

  function resetRoute() {
    setRoute(null);
    setRouteRequested(false);
  }

  return (
    <div className={`trace-workbench trace-full-map ${seeThrough ? "is-see-through" : ""}`}>
      <a className="skip-link" href="#fulong-map-content">跳转到地图</a>
      <header className="trace-topbar">
        <a href={import.meta.env.BASE_URL} className="trace-brand" aria-label={published ? "返回崇礼门户" : "返回崇礼门户，退出制图工作台"}>SKI TRAIL ATLAS <span>{published ? "富龙地图 MVP" : "制图工作台"}</span></a>
        <span className="trace-local"><i /> {published ? "富龙 MVP · 结构版" : "本地样板 · 未核验"}</span>
      </header>
      <main id="fulong-map-content" tabIndex={-1}>
        <div className="trace-intro">
          <div>
            <p className="trace-eyebrow">FULONG / FULL MAP / MVP</p>
            <h1>{published ? "整张图，找到你的下一条雪道。" : "整张图，逐段核对。"}</h1>
            <p>{published ? "按区域查看富龙雪道，了解连接关系，并在同一张图上演示路线。" : "富龙全图结构描摹。山的结构不变，视觉表达可以改变。"}</p>
          </div>
          <div className="trace-coverage"><strong>{String(trails.length).padStart(2, "0")}<span>组雪道标号</span></strong><strong>{segments.length}<span>个图示分段</span></strong><strong>{referenceFeatures.length}<span>项参考要素</span></strong></div>
        </div>
        <nav className="trace-sectors" aria-label={published ? "地图区域" : "核对区域"}>
          {(Object.entries(sectors) as [SectorId, typeof sectors[SectorId]][]).map(([key, item]) =>
            <button key={key} aria-pressed={sector === key} onClick={() => chooseSector(key)}>{item.name}</button>)}
        </nav>
        <div className="trace-layout">
          <section className="trace-map-section" aria-label={published ? "富龙全图结构地图" : "富龙全图描摹地图"}>
            <div className="trace-map-toolbar">
              {!published && <div className="trace-modes" aria-label="对照模式">
                {modes.map((item) => <button key={item.key} aria-pressed={mode === item.key}
                  onClick={() => setMode(item.key)}>{item.name}</button>)}
              </div>}
              <div className="trace-zoom">
                <button onClick={() => zoom(0.75)} aria-label="放大地图">＋</button>
                <button onClick={() => zoom(1.3333)} aria-label="缩小地图">−</button>
                <button onClick={() => setView(sectors[sector].frame)}>复位</button>
              </div>
            </div>
            {!published && imageFailed && <p className="trace-error" role="alert">
              本地高清参照未加载。请按 README 将 WEBP 放入 artifacts/reference/fulong-highres.webp，再刷新。
              独立线稿仍可查看。
            </p>}
            <div className="trace-canvas-wrap">
              <svg className={`trace-canvas is-${activeMode}`} role="group" aria-label="富龙全图原图坐标描摹"
                viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`} tabIndex={0}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === "+" || event.key === "=") zoom(0.8);
                  else if (event.key === "-") zoom(1.25);
                  else if (event.key === "Home") setView(sectors[sector].frame);
                  else if (event.key.startsWith("Arrow")) {
                    const step = view.width * 0.1;
                    setView(clamp({ ...view,
                      x: view.x + (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0),
                      y: view.y + (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0) }));
                  } else return;
                  event.preventDefault();
                }}
                onPointerDown={(event) => {
                  if (event.button !== 0 || (event.target as Element).closest("[data-select-trail]")) return;
                  const box = event.currentTarget.getBoundingClientRect();
                  const scale = Math.min(box.width / view.width, box.height / view.height);
                  drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, view, scale };
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={(event) => {
                  const origin = drag.current;
                  if (!origin || origin.pointer !== event.pointerId) return;
                  setView(clamp({ ...origin.view,
                    x: origin.view.x - (event.clientX - origin.x) / origin.scale,
                    y: origin.view.y - (event.clientY - origin.y) / origin.scale }));
                }}
                onPointerUp={() => { drag.current = null; }}
                onPointerCancel={() => { drag.current = null; }}
              >
                <title>{published
                  ? "富龙全图结构版，不用于现场导航。Tab 选择雪道，方向键平移，加减键缩放。"
                  : "仅供结构验收，不用于现场导航。Tab 选择雪道，方向键平移，加减键缩放。"}</title>
                <defs>
                  <marker id="trace-transport-arrival" viewBox="-24 -3 24 6" refX="0" refY="0"
                    markerWidth="24" markerHeight="6" markerUnits="userSpaceOnUse" orient="auto">
                    <path className="trace-arrival-cap" d="M -24 0 L 0 0" />
                  </marker>
                  <pattern id="trace-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#60756c" strokeOpacity=".08" />
                  </pattern>
                </defs>
                <rect x={reference.frame.x} y={reference.frame.y} width={reference.frame.width} height={reference.frame.height} fill="#e7ede5" />
                <rect x={reference.frame.x} y={reference.frame.y} width={reference.frame.width} height={reference.frame.height} fill="url(#trace-grid)" />
                {!published && <image href={reference.url} width={reference.width} height={reference.height}
                  opacity={activeMode === "redraw" ? 0 : activeMode === "reference" ? 1 : opacity}
                  pointerEvents="none" onError={() => setImageFailed(true)} />}
                <g visibility={activeMode === "reference" ? "hidden" : "visible"}>
                  {segments.map((segment) => <g key={segment.id}
                    data-segment={segment.id}
                    data-feature-state={segment.state}
                    data-routing-state={segment.direction === "pending" ? "excluded" : "candidate"}
                    className={`trace-segment ${segment.trail === selected || segment.featureCode === selected ? "is-selected" : ""} ${routeIds.has(segment.id) ? "is-route" : ""} ${segment.trail ? "" : "is-connector"} ${segment.direction === "pending" && !segment.trail && !segment.state ? "is-direction-pending" : ""} ${segment.state === "planned" ? "is-planned" : ""}`}>
                    <title>{segment.note ?? segment.trail ?? "未编号连接"}</title>
                    <path className="trace-line" d={segmentPath(segment)} />
                  </g>)}
                  {transports.map((transport) => <g key={transport.code} className={`trace-transport mode-${transport.mode}`} data-transport={transport.code}>
                    <title>{transport.code} · {transport.mode === "magic_carpet" ? "魔毯" : "索道（吊厢 / 缆车细分类待核验）"} · 图示走廊，未接入路线{transport.note ? ` · ${transport.note}` : ""}</title>
                    <path className="trace-transport-guide" d={transport.path} />
                    <path className="trace-transport-line" d={transport.path}
                      markerEnd={transport.top ? "url(#trace-transport-arrival)" : undefined} />
                  </g>)}
                  <g className="trace-terminals">
                    {[...terminalStations].map(([key, { point, codes }]) => <g key={key} data-terminal={key}
                      data-transports={codes.join(" ")}>
                      <title>{[...codes].sort().join(" / ")} 共用站点</title>
                      <rect className="trace-station" x={point.x - 8 * labelScale} y={point.y - 8 * labelScale}
                        width={16 * labelScale} height={16 * labelScale} />
                    </g>)}
                  </g>
                  {marks.map((trail) => <g key={trail.code} data-select-trail={trail.code}
                    className="trace-trail-control" role="button" tabIndex={0}
                    aria-label={`选择 ${trail.code}`} aria-pressed={selected === trail.code}
                    onClick={() => selectMark(trail.code)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectMark(trail.code);
                      }
                    }}>
                    {segments.filter((segment) => segment.trail === trail.code || segment.featureCode === trail.code).map((segment) =>
                      <path key={segment.id} className="trace-hit" d={segmentPath(segment)} />)}
                    {showLabels && trail.label && (view.width < 1900 || selected === trail.code) && <g className="trace-label" transform={`translate(${trail.label.x} ${trail.label.y}) scale(${labelScale})`}>
                      <rect x="-27" y="-15" width="54" height="30" rx="4" />
                      <text textAnchor="middle" dominantBaseline="central">{trail.code}</text>
                    </g>}
                  </g>)}
                  {showLabels && view.width < 1900 && repeatedLabels.map((item) =>
                    <g key={`${item.code}-${item.sector}`} className="trace-label" aria-hidden="true"
                      transform={`translate(${item.label.x} ${item.label.y}) scale(${labelScale})`}>
                      <rect x="-27" y="-15" width="54" height="30" rx="4" />
                      <text textAnchor="middle" dominantBaseline="central">{item.code}</text>
                    </g>)}
                  {showLabels && view.width < 1900 && transports.map(transport =>
                    <g key={transport.code} className="trace-transport-label" data-transport-label={transport.code}>
                      <text x={transport.label.x} y={transport.label.y} fontSize={16 * labelScale}>
                        {transport.code} {transport.mode === "magic_carpet" ? "魔毯" : "索道"}
                      </text>
                    </g>)}
                  {showLabels && view.width < 1900 && <>
                    <g className="trace-place" data-place="summit">
                      <text x={nodes.summit.x} y={nodes.summit.y - 28} textAnchor="middle" fontSize={17 * labelScale}>山顶 · L3 / L5 / L7 汇合</text>
                    </g>
                    <g className="trace-place" data-place="restaurant">
                      <text x={nodes.ridge.x + 15} y={nodes.ridge.y - 27} fontSize={17 * labelScale}>岚山餐厅</text>
                    </g>
                    <g className="trace-barrier" data-barrier="b11-a7-a8">
                      <title>B11 与 A7/A8 之间有房屋隔断，不直接联通</title>
                      <path d="M 2009 858 L 2022 847 L 2035 858 L 2035 876 L 2009 876 Z" />
                      <text x="2050" y="888" fontSize={15 * labelScale}>房屋隔断 · 不直连</text>
                    </g>
                  </>}
                  {transports.flatMap(transport => (transport.intermediateStations ?? []).map(station => {
                    const point = nodes[station.nodeId];
                    return <g key={station.nodeId} className="trace-intermediate-station" data-station={station.nodeId}>
                      <title>{station.name}（用户确认，未核验上客及雪道出口）</title>
                      <circle cx={point.x} cy={point.y} r={9 * labelScale} />
                      {showLabels && view.width < 1900 && <>
                        <path d={`M ${point.x - 10} ${point.y - 10} L ${point.x - 35} ${point.y - 20}`} />
                        <text x={point.x - 35} y={point.y - 30} textAnchor="end" fontSize={16 * labelScale}>{station.name}</text>
                      </>}
                    </g>;
                  }))}
                  {showNodes && Object.entries(nodes).map(([id, node]) => <g key={id} className="trace-node">
                    <circle cx={node.x} cy={node.y} r={6 * labelScale} />
                    {view.width < 1900 && <text x={node.x + 12} y={node.y - 12}>{id}</text>}
                  </g>)}
                </g>
              </svg>
              <span className="trace-map-caption">{published
                ? "FULONG TRAIL ATLAS / STRUCTURAL MVP"
                : activeMode === "redraw"
                  ? "全图结构线稿 / 非最终视觉"
                  : "SOURCE FRAME / 3631 × 2560"}</span>
            </div>
            <div className="trace-map-options">
              {!published && <label className="trace-opacity">原图透明度
                <input type="range" min="0" max="1" step=".05" value={opacity}
                  disabled={mode !== "overlay"} onChange={(event) => setOpacity(Number(event.target.value))} />
                <output>{Math.round(opacity * 100)}%</output>
              </label>}
              {!published && <button className="trace-compare" onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId); setCompare(true);
              }} onPointerUp={() => setCompare(false)} onPointerCancel={() => setCompare(false)}
              onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") { event.preventDefault(); setCompare(true); } }}
              onKeyUp={() => setCompare(false)} onBlur={() => setCompare(false)}>按住看原图</button>}
              <label><input type="checkbox" checked={showNodes} onChange={(event) => setShowNodes(event.target.checked)} /> 交叉口</label>
              <label><input type="checkbox" checked={showLabels} onChange={(event) => setShowLabels(event.target.checked)} /> 编号</label>
              <label><input type="checkbox" checked={seeThrough} onChange={(event) => setSeeThrough(event.target.checked)} /> 透视叠加</label>
            </div>
            <div className="trace-map-legend" aria-label="地图图例">
              <span><i /> 雪道 / 连接道 · 等宽实线</span>
              <span><i className="transport" /> 索道 / 魔毯 · 紫色虚线 + 方形站点</span>
              <span><i className="midstation" /> 圆圈：中途下客站</span>
              <span><i className="reference" /> 参考要素 · 灰色虚线</span>
              <span><i className="selected" /> 已选雪道</span><span><i className="route" /> 演示路线</span>
            </div>
            <p className="trace-map-hint">当前为结构校准色；后续按核验资料标注难度颜色与文字，未知难度保留中性色。选中或路线高亮不改变线宽。</p>
            <p className="trace-map-hint">透视叠加：线条与标签底板半透明，文字和站点保持清晰；关闭可查看实色线条。待核验分段仍不参与规划。</p>
            <p className="trace-map-hint">{published ? "选择区域放大查看 · 拖动空白处平移 · Home 复位" : "选择区域放大核对 · 拖动空白处平移 · Home 复位 · 全图仅显示选中编号；新区域待验收"}</p>
            <p className="trace-muted">{published ? "地图为结构版 MVP，难度、逐道资料和视频将按来源逐步补全。" : `${userCorrections.note} 本地线稿暂隐藏 F8/F9；高清原图保留历史标注。相邻通道已接至教学区。`}</p>
          </section>
          <aside className="trace-inspector">
            <section>
              <p className="trace-eyebrow">01 / TRAIL INSPECTOR</p>
              <h2>{published ? "雪道信息" : "逐道检查"}</h2>
              <div className="trace-trail-picker" aria-label="雪道列表">
                {visibleTrails.map((trail) => <button key={trail.code} aria-pressed={selected === trail.code}
                  onClick={() => selectMark(trail.code)}>{trail.code}</button>)}
              </div>
              <details className="trace-reference-list">
                <summary>参考要素 · 非发布雪道（{referenceFeatures.length}）</summary>
                <div className="trace-trail-picker">{referenceFeatures.map((feature) =>
                  <button key={feature.code} aria-pressed={selected === feature.code} onClick={() => selectMark(feature.code)}>{feature.code}</button>)}</div>
              </details>
              <div className="trace-selection-heading"><strong>{selected}</strong><span>{published
                ? selectedMark.state === "open-reported"
                  ? "用户报告已开放 · 非实时状态"
                  : selectedMark.state === "planned"
                    ? "参考要素 · 不参与路线"
                    : selectedMark.state === "unlocated"
                      ? "未定位 · 不补绘"
                      : selectedMark.review === "accepted"
                        ? "结构已确认 · 通行待核验"
                        : "结构候选 · 方向待核验"
                : selectedMark.review === "accepted"
                  ? "东侧描摹已认可 · 通行待核验"
                  : selectedMark.state === "open-reported"
                    ? "用户反馈已开放 · 非实时状态"
                    : selectedMark.state === "planned"
                      ? "原图规划线 · 不参与规划"
                      : "候选描摹 · 等待验收"}</span></div>
              {selectedMark.note && <p className="trace-feature-note" role="note">{selectedMark.note}</p>}
              {selectedMark.state === "unlocated" && <p className="trace-muted">当前没有可绘制几何。保留原图图例记录，不补造线路。</p>}
              <ol className="trace-segments">
                {selectedSegments.map((segment) => <li key={segment.id}>
                  <code>{segment.id}</code>
                  <span>{nodes[segment.from].name}<b>{segment.direction === "pending" ? "— 图示连接，方向待核验 —" : "↓ 候选下行"}</b>{nodes[segment.to].name}</span>
                  <small>{segment.note ?? (segment.direction === "pending" ? "方向待核验，暂不参与路线规划。" : "仅供结构路线演示，不代表现场可通行。")}</small>
                </li>)}
              </ol>
              {pendingSegments.map((segment) => <div className="trace-pending-note" key={segment.id} role="note">
                <strong>{published ? "连接记录 · 归属与方向待核验" : "新补绘 · 归属与方向待核验"}</strong>
                <p>{segment.note}</p>
                <code>{segment.id}</code>
              </div>)}
              <p className="trace-muted">{published ? "选中雪道后可查看其结构分段；逐道文字、视频和正式路线资格会随资料审核逐步补全。" : "全图分段先验证位置和形状；尚未核验的雪道不会进入路线规划。介绍与逐道视频留待内容核验。"}</p>
            </section>
            <section>
              <p className="trace-eyebrow">02 / CONNECTIVITY STUDY</p>
              <h2>走一遍这张图</h2>
              <p className="trace-muted">仅演示东侧已标注的候选连接；方向待核验的分段不会自动加入路线，索道尚未接入。路线是结构示意，不是现场导航。</p>
              <div className="trace-endpoint">
                <label htmlFor="trace-start">起点</label>
                <select id="trace-start" value={start} onChange={(event) => { setStart(event.target.value as NodeId); resetRoute(); }}>
                  {Object.entries(nodes).map(([id, node]) => <option key={id} value={id}>{node.name}</option>)}
                </select>
              </div>
              <div className="trace-endpoint">
                <label htmlFor="trace-end">终点</label>
                <select id="trace-end" value={end} onChange={(event) => { setEnd(event.target.value as NodeId); resetRoute(); }}>
                  {Object.entries(nodes).map(([id, node]) => <option key={id} value={id}>{node.name}</option>)}
                </select>
              </div>
              <div className="trace-route-actions">
                <button className="trace-primary" onClick={() => {
                  const result = findPilotRoute(start, end);
                  setRoute(result); setRouteRequested(true);
                  if (result?.length) { setSector("east"); setView(sectors.east.frame); }
                  if (mode === "reference") setMode("overlay");
                }}>在图上演示 ↗</button>
                {routeRequested && <button onClick={resetRoute}>清除</button>}
              </div>
              <div className="trace-route-result" aria-live="polite">
                {routeRequested && route === null && <p>{published
                  ? "当前没有足够的已标注有向连接，不自动补线或反向穿越；不代表实际雪场不可达。"
                  : "本样板尚无已标注的下行连接，不自动补线或反向穿越；不代表实际雪场不可达。"}</p>}
                {routeRequested && route?.length === 0 && <p>起终点相同，无需经过任何分段。</p>}
                {!!route?.length && <ol>{route.map((segment) => <li key={segment.id}>
                  <span>{segment.trail ?? "未编号连接"}</span><code>{segment.id}</code>
                </li>)}</ol>}
              </div>
            </section>
            <section className="trace-review-note">
              <p className="trace-eyebrow">{published ? "ABOUT THIS MAP" : "REVIEW GATE"}</p>
              <p>{published ? "这是富龙全图结构版 MVP，先把地图、详情和路线放在同一张图上。" : "逐区核对弯道、分岔和汇合，通过验收后再接入正式地图。"}</p>
              <small>参考图不是测绘或实时运营数据。遮挡处的插值与通行方向仍需核验，本页面不用于现场导航。</small>
            </section>
          </aside>
        </div>
      </main>
      <footer className="trace-footer"><span>Fidelity before styling.</span><span>{published ? "富龙 / 全图结构 / MVP" : "富龙 / 全图结构 / 2026-09-24 · 未发布"}</span></footer>
    </div>
  );
}
