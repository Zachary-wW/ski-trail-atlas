import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles.css";

const FulongMap = lazy(() => import("./map/prototype/FulongTracePrototype"));
const search = new URLSearchParams(location.search);
const prototype = search.get("prototype");
const base = import.meta.env.BASE_URL;
const isAppRoot = location.pathname === base || location.pathname === base.replace(/\/$/, "");
const useFulongMap = ["fulong-trace", "east-trace"].includes(prototype ?? "")
  || (import.meta.env.PROD && isAppRoot && !search.has("route"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>正在加载地图…</p>}>
      {useFulongMap ? <FulongMap published={import.meta.env.PROD} /> : <App />}
    </Suspense>
  </StrictMode>,
);
