import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

// Define the shape of the location
interface UserLocation {
  lat: number | null;
  lng: number | null;
}

// Define the props for the provider
interface UserLocationProviderProps {
  children: ReactNode;
}

// Create context with initial value
const UserLocationContext = createContext<UserLocation>({ lat: null, lng: null });

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<UserLocation>({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () =>
          setUserLocation({ lat: 23.8103, lng: 90.4125 }) // fallback if user denies
      );
    } else {
      setUserLocation({ lat: 23.8103, lng: 90.4125 });
    }
  }, []);

  return (
    <UserLocationContext.Provider value={userLocation}>
      {children}
    </UserLocationContext.Provider>
  );
};

// Custom hook for easier usage
export const useUserLocation = (): UserLocation => useContext(UserLocationContext);
