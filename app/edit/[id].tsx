import Form from "@/components/Form";
import { FormDataState, initialState } from "@/constants/FormState";
import { StorageContext } from "@/modules/storage";
import { Medication } from "@/types/medication";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { findMedication, updateMedication } = useContext(StorageContext);

  const [formState, setFormState] = useState<FormDataState>(initialState);

  useEffect(() => {
    findMedication(id as string).then((medication) => {
      if (medication) {
        setFormState({
          name: medication.name,
          startHour: medication.startHour,
          interval: medication.interval,
          error: {
            name: null,
          },
        });
      }
    });
  }, [findMedication]);

  const update = async () => {
    if (!formState.name) {
      setFormState((state) => {
        return {
          ...state,
          error: {
            name: "Please enter a medication name",
          },
        };
      });
      return;
    }

    const medication: Medication = {
      id: id as string,
      name: formState.name,
      startHour: {
        hour: formState.startHour.hour,
        minutes: formState.startHour.minutes,
      },
      interval: {
        hour: formState.interval.hour,
        minutes: formState.interval.minutes,
      },
    };

    try {
      await updateMedication(medication);
      //   await scheduleNotification(medication);

      router.back();
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  return (
    <Form formState={formState} onChange={setFormState} onSubmit={update} />
  );
}
