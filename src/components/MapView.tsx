import React, { useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { PickupPoint } from "../../../types";

interface MapViewProps {
  pickupPoints: PickupPoint[];
  selectedPoint: PickupPoint | null;
  onPointSelect: (point: PickupPoint) => void;
  userLocation: { lat: number; lng: number } | null;
}

export default function MapView({
  pickupPoints,
  selectedPoint,
  onPointSelect,
  userLocation,
}: MapViewProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const center =
    userLocation ||
    (pickupPoints.length > 0
      ? { lat: pickupPoints[0].Latitude, lng: pickupPoints[0].Longitude }
      : { lat: 23.8103, lng: 90.4125 }); // fallback to Dhaka

  const getDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="w-full h-96">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={13}
        onLoad={(map) => (mapRef.current = map)}
      >
        {pickupPoints.map((point) => {
          const distance = userLocation
            ? Math.round(getDistanceInKm(userLocation.lat, userLocation.lng, point.Latitude, point.Longitude) * 10) / 10
            : undefined;

          return (
            <Marker
              key={point._id.toString()}
              position={{ lat: point.Latitude, lng: point.Longitude }}
              onClick={() => {
                setActiveMarker(point._id.toString());
                onPointSelect(point);
              }}
            >
              {activeMarker === point._id.toString() && (
                <InfoWindow
                  position={{ lat: point.Latitude, lng: point.Longitude }}
                  onCloseClick={() => setActiveMarker(null)}
                >
                  <div>
                    <h3 className="font-medium">{point.Name}</h3>
                    <p className="text-sm text-gray-600">{point.Address}</p>
                    {distance !== undefined && (
                      <p className="text-xs text-gray-500">{distance} km away</p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  );
}
