import { Text, TextInput } from "@/components/Themed";
import { TimeInput } from "@/components/TimeInput";
import { Time } from "@/types/medication";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type FormDataState = {
  name: string;
  startHour: Time;
  interval: Time;
  error: {
    name: string | null;
  };
};

type FormProps = {
  formState: FormDataState;
  onChange: (formState: FormDataState) => void;
  onSubmit: () => void;
};

export default function Form({
  formState,
  onChange,
  onSubmit,
}: FormProps): JSX.Element {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medication Name</Text>
        <TextInput
          style={styles.input}
          placeholder="My medication name"
          placeholderTextColor={"#ccc"}
          value={formState.name}
          onChangeText={(name) => onChange({ ...formState, name })}
        />
        {formState.error.name && (
          <Text style={styles.hint}>{formState.error.name}</Text>
        )}
      </View>

      <View style={styles.timeContainer}>
        <TimeInput
          label="Start hour:"
          time={formState.startHour}
          onChange={(time) => onChange({ ...formState, startHour: time })}
        />
        <TimeInput
          label="Interval hour:"
          time={formState.interval}
          onChange={(time) => onChange({ ...formState, interval: time })}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
        <Text style={styles.saveButtonText}>Save Medication</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: "#ff4a4a",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 6,
    padding: 12,
    fontSize: 16,
  },
  timeContainer: {
    flex: 1,
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: "auto",
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
