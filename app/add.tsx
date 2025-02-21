import { StorageContext } from "@/modules/storage";
import { Medication } from "@/types/medication";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddMedication() {
  const router = useRouter();

  const { addMedication } = useContext(StorageContext);

  const [name, setName] = useState("");

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    if (!name) {
      alert("Please enter medication name");
      return;
    }

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    const medication: Medication = {
      id: Date.now().toString(),
      name,
      time: date.toISOString(),
    };

    try {
      await addMedication(medication);
      await scheduleNotification(medication);

      router.back();
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  const formatTime = () => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeButtonText}>{formatTime()}</Text>
      </TouchableOpacity>

      <Modal visible={showTimePicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Time</Text>

            <View style={styles.pickerRow}>
              <Picker
                selectedValue={hours}
                onValueChange={(value) => setHours(value)}
                style={styles.picker}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <Picker.Item key={i} label={`${i}`} value={i} />
                ))}
              </Picker>
              <Text style={styles.colon}>:</Text>
              <Picker
                selectedValue={minutes}
                onValueChange={(value) => setMinutes(value)}
                style={styles.picker}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i < 10 ? "0" + i : i}`}
                    value={i}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowTimePicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.saveButton} onPress={saveMedication}>
        <Text style={styles.saveButtonText}>Save Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  timeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  timeButtonText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 100,
    height: 150,
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
  },
});
