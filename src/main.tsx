import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { appHref, routePathFromLocation } from "./app-paths";
import ChongliPortal from "./ChongliPortal";
import "./styles.css";

const FulongMap = lazy(() => import("./map/prototype/FulongTracePrototype"));
const search = new URLSearchParams(location.search);
const prototype = search.get("prototype");
const routePath = routePathFromLocation(location.pathname, location.search);
if (search.has("route")) {
  window.history.replaceState(null, "", appHref(routePath));
}
const useWorkbench = ["fulong-trace", "east-trace"].includes(prototype ?? "");
const useFulongMap = useWorkbench || routePath === "/resorts/fulong/map";
const usePortal = routePath === "/" && !useWorkbench;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<p>正在加载地图…</p>}>
      {useFulongMap
        ? <FulongMap published={!useWorkbench || import.meta.env.PROD} />
        : usePortal
          ? <ChongliPortal />
          : <App />}
    </Suspense>
  </StrictMode>,
);
