export function appHref(path: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}

export function routePathFromLocation(
  pathname: string,
  search = "",
  base = import.meta.env.BASE_URL,
) {
  const redirectedRoute = new URLSearchParams(search).get("route");

  if (redirectedRoute?.startsWith("/")) {
    return redirectedRoute;
  }

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);

  if (pathname === baseWithoutTrailingSlash || pathname === normalizedBase) {
    return "/";
  }

  if (pathname.startsWith(normalizedBase)) {
    return `/${pathname.slice(normalizedBase.length)}`;
  }

  return pathname || "/";
}
