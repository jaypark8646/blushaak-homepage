export const TRACKING_COOKIE_NAME = "blushaak_tracking";
export const TRACKING_STORAGE_KEY = "blushaak_tracking";
export const TRACKING_PARAM_KEYS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;
export const TRACKING_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type TrackingParamKey = (typeof TRACKING_PARAM_KEYS)[number];

export interface TrackingParams {
  ref: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export const EMPTY_TRACKING_PARAMS: TrackingParams = {
  ref: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
};

function normalizeTrackingValue(value: string | null | undefined) {
  return value?.trim() ?? "";
}

export function mergeTrackingParams(
  base: Partial<TrackingParams>,
  incoming: Partial<TrackingParams>,
) {
  return TRACKING_PARAM_KEYS.reduce<TrackingParams>((acc, key) => {
    acc[key] = normalizeTrackingValue(incoming[key]) || normalizeTrackingValue(base[key]);
    return acc;
  }, { ...EMPTY_TRACKING_PARAMS });
}

export function readTrackingParamsFromSearchParams(searchParams: URLSearchParams) {
  const next = { ...EMPTY_TRACKING_PARAMS };

  TRACKING_PARAM_KEYS.forEach((key) => {
    next[key] = normalizeTrackingValue(searchParams.get(key));
  });

  return next;
}

export function parseTrackingCookie(cookieValue: string | undefined) {
  if (!cookieValue) {
    return { ...EMPTY_TRACKING_PARAMS };
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue)) as Partial<TrackingParams>;
    return mergeTrackingParams(EMPTY_TRACKING_PARAMS, parsed);
  } catch {
    return { ...EMPTY_TRACKING_PARAMS };
  }
}

export function readTrackingCookieFromDocument() {
  if (typeof document === "undefined") {
    return { ...EMPTY_TRACKING_PARAMS };
  }

  const cookieEntry = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${TRACKING_COOKIE_NAME}=`));

  const cookieValue = cookieEntry?.split("=")[1];
  return parseTrackingCookie(cookieValue);
}

export function readTrackingParamsFromStorage() {
  if (typeof window === "undefined") {
    return { ...EMPTY_TRACKING_PARAMS };
  }

  try {
    const raw = window.sessionStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_TRACKING_PARAMS };
    }

    return mergeTrackingParams(EMPTY_TRACKING_PARAMS, JSON.parse(raw) as Partial<TrackingParams>);
  } catch {
    return { ...EMPTY_TRACKING_PARAMS };
  }
}

export function persistTrackingParams(params: TrackingParams) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return params;
  }

  const serialized = JSON.stringify(params);
  window.sessionStorage.setItem(TRACKING_STORAGE_KEY, serialized);
  document.cookie = `${TRACKING_COOKIE_NAME}=${encodeURIComponent(serialized)}; path=/; max-age=${TRACKING_COOKIE_MAX_AGE}; SameSite=Lax`;

  return params;
}

export function getTrackingParamsFromBrowser(searchParams?: URLSearchParams) {
  const fromQuery = searchParams
    ? readTrackingParamsFromSearchParams(searchParams)
    : { ...EMPTY_TRACKING_PARAMS };
  const fromStorage = readTrackingParamsFromStorage();
  const fromCookie = readTrackingCookieFromDocument();

  const merged = mergeTrackingParams(fromCookie, fromStorage);
  return mergeTrackingParams(merged, fromQuery);
}

export function hasTrackingParams(params: TrackingParams) {
  return TRACKING_PARAM_KEYS.some((key) => Boolean(params[key]));
}
