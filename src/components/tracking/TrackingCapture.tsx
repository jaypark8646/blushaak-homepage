"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getTrackingParamsFromBrowser,
  hasTrackingParams,
  persistTrackingParams,
} from "@/lib/tracking";

export default function TrackingCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nextTrackingParams = getTrackingParamsFromBrowser(searchParams);

    if (hasTrackingParams(nextTrackingParams)) {
      persistTrackingParams(nextTrackingParams);
    }
  }, [pathname, searchParams]);

  return null;
}
