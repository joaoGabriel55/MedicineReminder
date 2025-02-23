import { Time } from "@/types/medication";
import { Entypo } from "@expo/vector-icons";

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text, TextInput } from "@/components/Themed";

type Props = {
  label: string;
  time: Time;
  onlyHour?: boolean;
  onChange: (time: Time) => void;
};

export function TimeInput({ label, time: timeProp, onChange }: Props) {
  const handleInputTime = (field: keyof Time, value: string) => {
    const currentTime = timeProp[field];
    const timeLimit = field === "hour" ? 23 : 59;

    const sanitizedValue = currentTime.startsWith("0")
      ? value.substring(1).replace(/[^0-9]/g, "")
      : value.replace(/[^0-9]/g, "");

    const numericValue = Number(sanitizedValue);

    if (numericValue >= 0 && numericValue <= timeLimit) {
      onChange({
        ...timeProp,
        [field]: sanitizedValue.padStart(2, "0"),
      });
    }
  };

  const handleArrowClick = (field: keyof Time, type: "up" | "down") => {
    const currentTime = Number(timeProp[field]);
    const timeLimit = field === "hour" ? 23 : 59;
    let newTime = 0;

    if (type === "up") {
      newTime = currentTime === timeLimit ? 0 : currentTime + 1;
    } else if (type === "down") {
      newTime = currentTime === 0 ? timeLimit : currentTime - 1;
    }

    onChange({
      ...timeProp,
      [field]: String(newTime).padStart(2, "0"),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => handleArrowClick("hour", "up")}>
            <Entypo name="chevron-thin-up" size={32} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputTime("hour", text)}
            value={timeProp.hour}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => handleArrowClick("hour", "down")}>
            <Entypo name="chevron-thin-down" size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => handleArrowClick("minutes", "up")}>
            <Entypo name="chevron-thin-up" size={32} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputTime("minutes", text)}
            value={timeProp.minutes}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => handleArrowClick("minutes", "down")}>
            <Entypo name="chevron-thin-down" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "60%",
    marginHorizontal: "auto",
  },
  label: { fontSize: 16 },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    gap: 34,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    height: 100,
    width: 100,
    borderWidth: 1,

    borderRadius: 8,
    padding: 10,

    fontSize: 48,
    textAlign: "center",
  },
  button: {
    margin: 10,
  },
});
