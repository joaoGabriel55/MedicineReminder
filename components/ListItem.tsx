import { Text, View } from "@/components/Themed";
import { Medication } from "@/types/medication";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type ListItemProps = {
  item: Medication;
  onClick: () => void;
  onDelete: (item: Medication) => void;
};

export function ListItem({ item, onClick, onDelete }: ListItemProps) {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={styles.item}>
        <View style={styles.itemHeaderContainer}>
          <Text style={styles.itemTextHeader}>{item.name}</Text>
          <TouchableOpacity onPress={(event) => {
            event.stopPropagation();
            onDelete(item);
          }}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.timesContainer}>
          <View>
            <Text style={styles.itemText}>Start hour:</Text>
            <Text style={styles.itemTimeText}>
              {item.startHour.hour}:{item.startHour.minutes}
            </Text>
          </View>
          <View>
            <Text style={styles.itemText}>Interval:</Text>
            <Text style={styles.itemTimeText}>
              {item.interval.hour}:{item.interval.minutes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
  },
  itemHeaderContainer: {
    flexDirection: "row",
    gap: 18,
    backgroundColor: "#1E1E1E",
    justifyContent: "space-between",
  },
  item: {
    borderRadius: 8,
    flex: 1,
    justifyContent: "space-between",
    gap: 18,
    padding: 24,
    backgroundColor: "#1E1E1E",
    marginBottom: 16,
  },
  itemTextHeader: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  itemText: {
    backgroundColor: "#1E1E1E",
    fontSize: 16,
  },
  timesContainer: {
    flexDirection: "row",
    gap: 48,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  itemTimeText: {
    backgroundColor: "#1E1E1E",
    fontSize: 24,
  },
  deleteButton: {
    width: 100,
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -100,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
