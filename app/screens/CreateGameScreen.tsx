import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Title } from "./HomeScreen";
const { width } = Dimensions.get("window");

export default function CreateGameScreen() {
  const [theme, setTheme] = useState("");

  const handleNext = () => {
    if (!theme.trim()) {
      return;
    }
    // Navigate to next screen with the theme name
    router.push({
      pathname: "/screens/CustomGameScreen",
      params: { theme: theme },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <Title />
        <View style={styles.content}>
          <ThemedText style={styles.inputLabel}>NAME YOUR GAME</ThemedText>
          <TextInput
            style={styles.input}
            value={theme}
            onChangeText={setTheme}
            placeholder="Ex. Farm Animals"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <ThemedText style={styles.buttonText}>NEXT</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A2B82", // Deep purple background
    padding: 20,
  },
  header: {
    marginTop: 60,
    backgroundColor: "#45D0C1", // Turquoise color for header
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#45D0C1", // Turquoise button
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
