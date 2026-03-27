"use client";

import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Store } from "@/types";

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9d6e3" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
];

interface StoreMapProps {
  stores: Store[];
  selectedStoreId?: string;
  onStoreSelect?: (storeId: string) => void;
}

const DEFAULT_CENTER = { lat: 37.55, lng: 127.1 };
const DEFAULT_ZOOM = 10;

export default function StoreMap({ stores, selectedStoreId, onStoreSelect }: StoreMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(selectedStoreId || null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (storeId: string, lat: number, lng: number) => {
    setActiveMarker(storeId);
    onStoreSelect?.(storeId);
    map?.panTo({ lat, lng });
  };

  if (loadError) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl bg-gray-50">
        <p className="text-sm text-gray-400">지도를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blu-500" />
          <p className="text-sm text-gray-400">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[60vh] overflow-hidden rounded-2xl border border-gray-100">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {stores.map((store) => (
          <MarkerF
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => handleMarkerClick(store.id, store.lat, store.lng)}
            icon={{
              url: "data:image/svg+xml," + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
                  <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="${activeMarker === store.id ? '#1a6dff' : '#3b82f6'}"/>
                  <circle cx="18" cy="18" r="8" fill="white"/>
                  <text x="18" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="${activeMarker === store.id ? '#1a6dff' : '#3b82f6'}">B</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(36, 48),
              anchor: new google.maps.Point(18, 48),
            }}
          >
            {activeMarker === store.id && (
              <InfoWindowF
                position={{ lat: store.lat, lng: store.lng }}
                onCloseClick={() => setActiveMarker(null)}
                options={{
                  maxWidth: 280,
                  minWidth: 280,
                  pixelOffset: new google.maps.Size(0, -8),
                }}
              >
                <div className="w-[248px] p-2">
                  <h3 className="mb-1 text-sm font-bold text-gray-900">{store.name}</h3>
                  <p className="mb-1 text-xs leading-relaxed text-gray-500">{store.address}</p>
                  <p className="mb-1 text-xs text-gray-500">{store.phone}</p>
                  <p className="text-xs text-gray-400">{store.hours}</p>
                  {store.hasDriveThru && (
                    <span className="mt-1 inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                      Drive-Thru
                    </span>
                  )}
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
}
