import Form from "@/components/Form";
import { FormDataState, initialState } from "@/constants/FormState";
import { StorageContext } from "@/modules/storage";
import { Medication, Time } from "@/types/medication";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";

export default function AddMedication() {
  const router = useRouter();

  const { addMedication } = useContext(StorageContext);

  const [formState, setFormState] = useState<FormDataState>(initialState);

  const scheduleNotification = async (medication: Medication) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `Time to take your ${medication.name}`,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        channelId: "default",
        repeats: true,
        seconds: 60,
      },
    });
  };

  const saveMedication = async () => {
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
      id: Date.now().toString(),
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
      await addMedication(medication);
      await scheduleNotification(medication);

      router.back();
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  return (
    <Form
      formState={formState}
      onChange={setFormState}
      onSubmit={saveMedication}
    />
  );
}
