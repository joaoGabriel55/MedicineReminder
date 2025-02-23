import { ListItem } from "@/components/ListItem";
import { Text, View } from "@/components/Themed";
import { StorageContext } from "@/modules/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { medications, deleteMedication } = useContext(StorageContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onClick={() => router.push(`/edit/${item.id}`)}
            onDelete={deleteMedication}
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
              }}
            >
              No medications scheduled
            </Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 28,
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
