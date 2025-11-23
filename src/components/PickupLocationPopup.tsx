import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";

interface PickupLocationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 23.8103, lng: 90.4125 }; // Dhaka

const PickupLocationPopup: React.FC<PickupLocationPopupProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: defaultCenter.lat,
    lng: defaultCenter.lng,
    name: "Loading...",
  });
  const [mapKey, setMapKey] = useState(0); // Force remount for fresh map

  useEffect(() => {
    if (isOpen) {
      setMapKey((prev) => prev + 1); // Reset map each time
    }
  }, [isOpen]);

  const getPlaceName = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return "Unknown location";
    } catch {
      return "Unknown location";
    }
  };

  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      const name = await getPlaceName(lat, lng);
      setSelectedLocation({ lat, lng, name });
    }
  }, []);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setMarkerPosition({ lat, lng });
          const name = await getPlaceName(lat, lng);
          setSelectedLocation({ lat, lng, name });
        },
        () => {
          alert("Sorry, your GPS is not working. Please pick manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleConfirm = () => {
    onLocationSelect(selectedLocation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-5 w-[90%] max-w-3xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mx-auto">Select Pickup Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            ✕
          </button>
        </div>

       

        {/* Google Map */}
 
          <GoogleMap
            key={mapKey}
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={14}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} draggable={true} onDragEnd={handleMapClick} />
          </GoogleMap>
       

        {/* Selected Info */}
        {/* <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Selected:</strong> {selectedLocation.name}
          </p>
          <p className="text-xs text-gray-500">
            Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
          </p>
        </div> */}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleCurrentLocation}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Current Location
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PickupLocationPopup;
