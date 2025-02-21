import { Medication } from "@/types/medication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";

type StorageContextValues = {
  medications: Medication[];
  addMedication: (medication: Medication) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (medication: Medication) => Promise<void>;
};

export const StorageContext = createContext<StorageContextValues>({
  medications: [],
  addMedication: () => Promise.resolve(),
  updateMedication: () => Promise.resolve(),
  deleteMedication: () => Promise.resolve(),
});

type StorageProviderProps = {
  children: React.ReactNode;
};

export default function StorageProvider({ children }: StorageProviderProps) {
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const stored = await AsyncStorage.getItem("medications");

      if (stored) {
        setMedications(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading medications:", error);
    }
  };

  const addMedication = useCallback(async (medication: Medication) => {
    try {
      const existing = await AsyncStorage.getItem("medications");
      const medications = existing ? JSON.parse(existing) : [];
      const updatedMedications = [...medications, medication];

      await AsyncStorage.setItem(
        "medications",
        JSON.stringify(updatedMedications)
      );

      setMedications(updatedMedications);
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        medications,
        addMedication,
        updateMedication: () => Promise.resolve(),
        deleteMedication: () => Promise.resolve(),
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
