import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles.css";

// A development-only review surface; Vite removes the prototype import in builds.
const Application = import.meta.env.DEV && ["fulong-trace", "east-trace"].includes(new URLSearchParams(location.search).get("prototype") ?? "")
  ? lazy(() => import("./map/prototype/FulongTracePrototype"))
  : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>正在加载地图…</p>}>
      <Application />
    </Suspense>
  </StrictMode>,
);
