import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  userLocation: {
    lat: number | null;
    lng: number | null;
  };
  setUserLocation: (location: { lat: number; lng: number }) => void;
  selectedPlantType: string | null;
  setSelectedPlantType: (plantType: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [selectedPlantType, setSelectedPlantType] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        userLocation,
        setUserLocation,
        selectedPlantType,
        setSelectedPlantType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
