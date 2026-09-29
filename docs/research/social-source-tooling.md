# Social-source collection tooling review

Updated: 2026-09-29. Scope: source discovery for M0 editorial research and a
future M4 daily collection service. This is a capability review, not approval to
install a collector, automate a personal account or republish third-party media.

## Decision

Keep M0 manual and reviewed. For a small, explicit discovery spike, prefer
[OpenCLI](https://github.com/jackwener/OpenCLI) as the common local adapter for
Xiaohongshu and WeChat article search. It uses a human-controlled Chrome session,
supports structured output, and already exposes both the Xiaohongshu search/note
commands and a Sogou Weixin article-search adapter.

[Agent Reach](https://github.com/Panniantong/Agent-Reach) is useful as an
installer, backend selector and health checker around Xiaohongshu access. It is
not the collector, scheduler, evidence store or editorial workflow, and its
current channel registry does not provide a WeChat Official Account channel.
Do not make the atlas depend on it at runtime.

For M4, evaluate
[We-MP-RSS](https://github.com/rachelos/we-mp-rss) in an isolated spike for a
small allow-list of official WeChat accounts. It already provides scheduled
updates, RSS, JSON/API/WebHook output and authorization-expiry reminders. Feed
its output into the atlas candidate-review contract; never publish its scraped
article bodies automatically.

No tool reviewed here provides a stable, official, unrestricted search API for
all Xiaohongshu notes or all WeChat Official Account articles. Browser sessions,
Sogou result pages, QR authorization and cookies are operational dependencies,
not implementation details to hide.

## Capability matrix

| Project | Useful capability | Authentication and operation | License / activity | Fit |
| --- | --- | --- | --- | --- |
| Agent Reach | Selects and diagnoses OpenCLI, `xiaohongshu-mcp` and a legacy XHS CLI; documents safe installation and local credential storage | Xiaohongshu still needs an existing Chrome session or explicitly exported cookies; its doctor intentionally does not prove that a platform command succeeds | MIT; repository head dated 2026-09-15 when reviewed | Optional workstation bootstrap only; not a data-plane dependency and not WeChat coverage |
| OpenCLI | `xiaohongshu search/note/comments/user` and structured JSON/CSV output; `weixin search` uses Sogou Weixin and `weixin download` reads a supplied article link | Browser bridge and a user-controlled Chrome profile; Xiaohongshu requires login. Weixin search explicitly detects verification/block pages and fails rather than returning partial data | Apache-2.0; repository head dated 2026-09-24 | Best single tool for a human-supervised discovery spike |
| `xiaohongshu-mcp` | Search, feed and note detail through MCP/HTTP, including title, description, author, engagement and comments | Login is required; note detail needs both note ID and `xsec_token`; cookie expiry and single-web-session behavior are documented | Apache-2.0; v2.5.5 released 2026-09-22 | Headless/remote fallback if OpenCLI is unsuitable; still requires explicit account/session stewardship |
| We-MP-RSS | Allow-list subscriptions, scheduled updates, RSS, JSON export, API/WebHook and authorization-expiry reminders | QR authorization and maintained session; runs a Python/FastAPI service plus database and scheduler | MIT in repository `LICENSE`; repository head dated 2026-09-24 | Strongest M4 WeChat subscription candidate; too large and stateful for M0 |
| MediaCrawler | Keyword and creator collection across Xiaohongshu and other social platforms; Playwright/CDP login-state reuse | Browser login, cached state and crawler maintenance; project warns against large-scale, unlawful and commercial use | GitHub exposes no SPDX license at review time; repository head dated 2026-09-19 | Do not adopt for the atlas. Ambiguous licensing and stated use restrictions outweigh breadth |

The open-source license of a collector covers its code. It does not grant rights
to copy the text, images or video collected from a platform.

## Primary-source observations

### Agent Reach

- The project describes itself as a capability layer: it selects, installs,
  diagnoses and routes to upstream tools rather than wrapping their reads.
- Its Xiaohongshu backend order is OpenCLI, `xiaohongshu-mcp`, then the legacy
  CLI. The channel check treats a connected OpenCLI bridge or reachable MCP
  server as insufficient proof of a valid login.
- Its installation guide requires explicit approval for system changes and
  recommends a secondary account because browser-session/cookie access can
  expose credentials or trigger account restrictions.
- The current source tree contains a Xiaohongshu channel but no WeChat/Weixin
  channel.

Sources: [Agent Reach README](https://github.com/Panniantong/Agent-Reach/blob/a19a171fa980a0785849596492e0af4db800c82f/README.md),
[Xiaohongshu channel](https://github.com/Panniantong/Agent-Reach/blob/a19a171fa980a0785849596492e0af4db800c82f/agent_reach/channels/xiaohongshu.py),
[installation guide](https://github.com/Panniantong/Agent-Reach/blob/a19a171fa980a0785849596492e0af4db800c82f/docs/install.md).

### OpenCLI

- The Xiaohongshu adapter documents keyword search, time/sort/type filters,
  note reading and JSON output. Reading a note requires the signed URL returned
  by search because a bare note ID is no longer reliable.
- The Weixin adapter searches Sogou Weixin and returns title, result URL,
  summary and rendered publication time. Its source code detects CAPTCHA,
  abnormal-access and partial-card states and returns explicit failures.
- Both are browser adapters. This is valuable for a supervised research session,
  but it is not a promise of unattended daily reliability.

Sources: [OpenCLI README](https://github.com/jackwener/OpenCLI/blob/24136945847afbfad266c6c46a8cd335377f9112/README.md),
[Xiaohongshu adapter](https://github.com/jackwener/OpenCLI/blob/24136945847afbfad266c6c46a8cd335377f9112/docs/adapters/browser/xiaohongshu.md),
[Weixin adapter](https://github.com/jackwener/OpenCLI/blob/24136945847afbfad266c6c46a8cd335377f9112/docs/adapters/browser/weixin.md),
[Weixin search implementation](https://github.com/jackwener/OpenCLI/blob/24136945847afbfad266c6c46a8cd335377f9112/clis/weixin/search.js).

### Platform-specific services

- `xiaohongshu-mcp` documents login as mandatory, search as supported and note
  detail as requiring `note_id` plus `xsec_token`. Its README also warns that
  the same account cannot remain logged in to multiple web sessions and that
  cookies can expire.
- We-MP-RSS documents scheduled article updates, RSS generation, JSON export,
  API/WebHook access, QR authorization and expiry reminders. Those capabilities
  make it a possible source connector, not an editorial authority.
- WeChat's official material-management API manages the authorized service
  account's own permanent and temporary assets. The documented
  `batchget_material` endpoint is not a general search endpoint for arbitrary
  public accounts, so it does not replace discovery or account subscriptions.

Sources: [`xiaohongshu-mcp` README](https://github.com/xpzouying/xiaohongshu-mcp/blob/a5c8f7799980ba1fdd501999843eb2d17e4c9a9f/README.md),
[We-MP-RSS README](https://github.com/rachelos/we-mp-rss/blob/126993c81a00466e9a6bbab041eef34ab27abe9c/ReadMe.md),
[We-MP-RSS license](https://github.com/rachelos/we-mp-rss/blob/126993c81a00466e9a6bbab041eef34ab27abe9c/LICENSE),
[WeChat material-management documentation](https://developers.weixin.qq.com/doc/service/guide/product/asset.html).

## Recommended rollout

### M0 editorial research

1. Search official resort sites and official accounts first. Use Xiaohongshu as
   a lead source or attributed community evidence, not automatic verification.
2. If manual browser search is too slow, run a one-session OpenCLI spike from a
   dedicated Chrome profile. Use narrow queries such as a resort name plus
   `开板`, `试营业`, `首滑` or the target snow season.
3. Capture only candidate metadata: source URL, publisher/account, displayed
   publication time, observed time, title/short snippet, query and source
   channel. Do not commit cookies, copied media or full scraped bodies.
4. A human opens the original link and records the event scope: trial/partial
   opening, full opening, announcement, historical observation or estimate.
5. Publish only reviewed claims through the existing publication compiler.

Installing Agent Reach or OpenCLI is not required to complete the T1 portal.
At review time, `agent-reach` and `opencli` were not installed in this workspace;
`mcporter` was present. Installation should therefore be a separate, explicit
tooling decision after T1, not an incidental dependency added during portal work.

### M4 daily intelligence

Keep collection outside the static web application:

```text
allow-listed connectors
        ↓
immutable private observations
        ↓
normalize + deduplicate into candidate Information Items
        ↓
editorial review and permitted-use decision
        ↓
versioned public snapshot (metadata + editor summary + source link)
        ↓
static site build
```

Connector failures must create a failed Collection Run and retain the last valid
public snapshot. CAPTCHA, expired auth, blocked access or missing publication
dates must never be converted into an empty feed or today's date. Use low,
documented request frequency, a dedicated account where appropriate, no CAPTCHA
bypass, no stealth/proxy rotation intended to evade controls, and no automatic
publication from raw search results.

## Spike acceptance criteria

Before choosing a connector for M4, demonstrate with non-production data that:

- an operator can search one Xiaohongshu query and one Weixin query, then export
  stable JSON containing original URLs and displayed source times;
- auth/CAPTCHA/blocked states fail explicitly and do not emit plausible empty
  success records;
- credentials stay outside the repository and logs redact cookie values;
- a duplicate URL or retelling maps to a reviewable duplicate candidate;
- copied bodies and media are excluded from the public build;
- a failed run leaves the last reviewed snapshot unchanged;
- each connector can be disabled independently without changing portal/map code.
