import { StorageContext } from "@/modules/storage";
import { Medication } from "@/types/medication";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { medications } = useContext(StorageContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        renderItem={({ item }: { item: Medication }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>
              {new Date(item.time).toLocaleTimeString()}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No medications scheduled</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addButtonText}>Add Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
