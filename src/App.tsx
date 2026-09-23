import { publication } from "./data/publication";
import { TrailCatalog } from "./TrailCatalog";
import { difficultyLabels } from "./trail-labels";

const verificationLabels: Record<string, string> = {
  verified: "资料已验证",
  unverified: "资料待交叉验证",
  stale: "资料可能已过期",
  link_only: "仅提供来源链接",
};

function formatSeason(season: string) {
  return `${season.replace("-", "–")} 雪季`;
}

function requestedTrailId(pathname: string) {
  if (pathname === "/" || pathname === "") {
    return publication.trails[0]?.id;
  }

  return pathname.match(/^\/trails\/([^/]+)\/?$/)?.[1];
}

function NotFound() {
  return (
    <main className="not-found">
      <a className="brand" href="/" aria-label="返回富龙雪道图鉴首页">
        <span className="brand-mark" aria-hidden="true">F</span>
        <span>
          <strong>富龙雪道图鉴</strong>
          <small>FULONG TRAIL ATLAS</small>
        </span>
      </a>
      <p className="eyebrow dark">404 · TRAIL NOT FOUND</p>
      <h1>页面不存在</h1>
      <p>没有找到这条雪道。请返回当前已发布的 A1「蓝调」档案。</p>
      <a className="home-link" href="/trails/fulong-a1">查看 A1 · 蓝调</a>
    </main>
  );
}

function App() {
  const trail = publication.trails.find(
    (candidate) => candidate.id === requestedTrailId(window.location.pathname),
  );

  if (!trail) {
    return <NotFound />;
  }

  const fields = trail.publishedFields;
  const difficulty = fields.difficulty;
  const primarySource = fields.averageSlopeDegrees?.source ?? difficulty?.source;

  const metrics = [
    { label: "雪道长度", value: fields.lengthM ? `${fields.lengthM.value} m` : undefined },
    {
      label: "平均宽度",
      value: fields.averageWidthM ? `${fields.averageWidthM.value} m` : undefined,
    },
    {
      label: "起点海拔",
      value: fields.summitElevationM ? `${fields.summitElevationM.value} m` : undefined,
    },
    {
      label: "平均坡度",
      value: fields.averageSlopeDegrees
        ? `${fields.averageSlopeDegrees.value}°`
        : undefined,
      featured: true,
    },
    {
      label: "最大坡度",
      value: fields.maximumSlopeDegrees
        ? `${fields.maximumSlopeDegrees.value}°`
        : undefined,
    },
  ];

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="富龙雪道图鉴首页">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>
            <strong>富龙雪道图鉴</strong>
            <small>FULONG TRAIL ATLAS</small>
          </span>
        </a>
        <span className="season-pill">{formatSeason(publication.season)}</span>
      </header>

      <TrailCatalog selectedTrailId={trail.id} />

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

          <nav className="breadcrumb" aria-label="面包屑">
            <a href="/">富龙滑雪场</a>
            <span aria-hidden="true">/</span>
            <span>雪道详情</span>
          </nav>

          <div className="hero-content">
            <div>
              <p className="eyebrow">TRAIL PROFILE · 雪道档案</p>
              <h1 id="trail-title">
                {trail.code} <span>·</span> {trail.name}
              </h1>
              <div className="status-row">
                <span className="difficulty-badge">
                  {difficultyLabels[String(difficulty?.value)] ?? "难度暂无数据"}
                </span>
                <span className="verification-badge">
                  <span className="status-dot" aria-hidden="true" />
                  {verificationLabels[difficulty?.verificationState ?? "unverified"]}
                </span>
              </div>
            </div>

            <aside className="quick-read" aria-label="快速了解">
              <span>快速了解</span>
              <strong>来源参数 · 证据可追溯</strong>
              <p>页面只展示来源报告的雪道参数；现场开放情况请以雪场当日公告为准。</p>
            </aside>
          </div>
        </section>

        <section className="content-grid">
          <article className="panel metrics-panel" aria-labelledby="metrics-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">TRAIL DATA</p>
                <h2 id="metrics-title">雪道参数</h2>
              </div>
              <span className="data-note">来源原值 · 未自行推算</span>
            </div>

            <dl className="metric-grid">
              {metrics.map((metric) => (
                <div className={metric.featured ? "metric featured" : "metric"} key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd className={metric.value ? "" : "missing"}>{metric.value ?? "暂无数据"}</dd>
                </div>
              ))}
            </dl>

            <div className="context-note">
              <span className="note-icon" aria-hidden="true">i</span>
              <p>
                坡度为来源页面报告的平均值，不代表雪道任意位置的实时坡度；本页不用于导航或安全判断。
              </p>
            </div>
          </article>

          <article className="panel evidence-panel" aria-labelledby="evidence-title">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow dark">EVIDENCE</p>
                <h2 id="evidence-title">资料依据</h2>
              </div>
              <span className="source-count">1 条来源</span>
            </div>

            {primarySource && (
              <div className="source-card">
                <div className="source-label">参考来源</div>
                <a href={primarySource.url} target="_blank" rel="noreferrer">
                  {primarySource.title}
                  <span aria-hidden="true">↗</span>
                </a>
                <p>{primarySource.publisher}</p>
                <dl>
                  <div>
                    <dt>适用雪季</dt>
                    <dd>{formatSeason(primarySource.season)}</dd>
                  </div>
                  <div>
                    <dt>最近核验</dt>
                    <dd>{publication.lastVerifiedAt}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="verification-line">
              <span className="status-dot" aria-hidden="true" />
              <div>
                <strong>{verificationLabels[difficulty?.verificationState ?? "unverified"]}</strong>
                <p>当前为单一公开来源快照，等待官方材料进一步确认。</p>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <span>独立雪道资料项目 · 非富龙滑雪场官方网站</span>
        <span>出行前请核对雪场当日公告</span>
      </footer>
    </div>
  );
}

export default App;
