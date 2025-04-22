import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ImageBackground,
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
          <ThemedText type="title" style={styles.inputLabel}>
            NAME YOUR GAME
          </ThemedText>
          <TextInput
            style={styles.input}
            value={theme}
            onChangeText={setTheme}
            placeholder="Ex. Farm Animals"
            placeholderTextColor="#999"
          />

          <ImageBackground
            source={require("../../assets/background.png")}
            imageStyle={{
              borderRadius: 15,
            }}
            style={{
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <ThemedText type="title" style={styles.buttonText}>
                NEXT
              </ThemedText>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f286e", // Deep purple background
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
    marginTop: 70,
    paddingHorizontal: 20,
  },
  inputLabel: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 16,
    color: "#333",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
