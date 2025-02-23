import { Medication } from "@/types/medication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";

type StorageContextValues = {
  medications: Medication[];
  findMedication: (id: string) => Promise<Medication | null>;
  addMedication: (medication: Medication) => Promise<void>;
  updateMedication: (medication: Medication) => Promise<void>;
  deleteMedication: (medication: Medication) => Promise<void>;
};

export const StorageContext = createContext<StorageContextValues>({
  medications: [],
  findMedication: () => Promise.resolve(null),
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

  const updatedMedicationsStore = useCallback(
    async (updatedMedications: Medication[]) => {
      await AsyncStorage.setItem(
        "medications",
        JSON.stringify(updatedMedications)
      );

      setMedications(updatedMedications);
    },
    []
  );

  const findMedication = useCallback(async (id: string) => {
    try {
      const stored = await AsyncStorage.getItem("medications");

      if (stored) {
        const medications = JSON.parse(stored);
        return medications.find(
          (medication: Medication) => medication.id === id
        );
      }
    } catch (error) {
      console.error("Error finding medication:", error);
    }
    return null;
  }, []);

  const addMedication = useCallback(async (medication: Medication) => {
    try {
      const existing = await AsyncStorage.getItem("medications");
      const medications = existing ? JSON.parse(existing) : [];
      const updatedMedications = [...medications, medication];

      await updatedMedicationsStore(updatedMedications);
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  }, []);

  const updateMedication = useCallback(async (medication: Medication) => {
    try {
      const existing = await AsyncStorage.getItem("medications");
      const medications = existing ? JSON.parse(existing) : [];
      const updatedMedications = medications.map((m: Medication) => {
        if (m.id === medication.id) {
          return medication;
        }
        return m;
      });

      await updatedMedicationsStore(updatedMedications);
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  }, []);

  const deleteMedication = useCallback(async (medication: Medication) => {
    try {
      const existing = await AsyncStorage.getItem("medications");
      const medications = existing ? JSON.parse(existing) : [];
      const updatedMedications = medications.filter(
        (m: Medication) => m.id !== medication.id
      );

      await updatedMedicationsStore(updatedMedications);
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        medications,
        findMedication,
        addMedication,
        updateMedication,
        deleteMedication,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
