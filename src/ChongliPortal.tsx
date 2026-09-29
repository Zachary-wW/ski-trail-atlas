import { useEffect } from "react";

import { appHref } from "./app-paths";
import "./chongli-portal.css";

export default function ChongliPortal() {
  useEffect(() => {
    document.documentElement.lang = "zh-CN";
    document.title = "崇礼滑雪指南 · Ski Trail Atlas";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "崇礼雪场入口与有来源依据的开板信息");
  }, []);

  return (
    <div className="portal-shell">
      <a className="skip-link" href="#portal-content">跳转到主要内容</a>
      <header className="portal-topbar">
        <a className="portal-brand" href={appHref("/")} aria-label="崇礼滑雪指南首页">
          <span>SKI TRAIL ATLAS</span>
          <small>CHONGLI</small>
        </a>
        <span className="portal-season">2026–2027 雪季</span>
      </header>

      <main id="portal-content" className="portal-main" tabIndex={-1}>
        <section className="portal-hero" aria-labelledby="portal-title">
          <p className="portal-eyebrow">CHONGLI / RESORT DIRECTORY</p>
          <h1 id="portal-title">崇礼滑雪指南</h1>
          <p className="portal-lede">
            从崇礼出发，查看每座雪场经过核验的开板展望，并进入已经开放的雪场指南。
          </p>
        </section>

        <section className="portal-directory" aria-labelledby="directory-title">
          <div className="portal-section-heading">
            <div>
              <p className="portal-eyebrow">01 / AVAILABLE RESORT</p>
              <h2 id="directory-title">先从富龙开始</h2>
            </div>
            <p>其他崇礼雪场将在名录和来源完成审核后加入。</p>
          </div>

          <article className="resort-card">
            <div className="resort-card-copy">
              <div className="resort-card-meta">
                <span>FULONG</span>
                <span className="outlook-state">开板信息待核验</span>
              </div>
              <h3>富龙滑雪场</h3>
              <p>
                当前可查看全雪场结构地图。雪道难度、设施和逐道资料仍会依据来源继续补全。
              </p>
              <dl className="resort-capabilities">
                <div>
                  <dt>已开放</dt>
                  <dd>结构地图</dd>
                </div>
                <div>
                  <dt>资料状态</dt>
                  <dd>持续核验</dd>
                </div>
              </dl>
            </div>
            <a className="resort-entry" href={appHref("/resorts/fulong/map")}>
              <span>进入富龙雪道地图</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </a>
          </article>
        </section>
      </main>

      <footer className="portal-footer">
        <span>信息有来源，缺失也如实呈现。</span>
        <span>地图不用于现场导航。</span>
      </footer>
    </div>
  );
}
