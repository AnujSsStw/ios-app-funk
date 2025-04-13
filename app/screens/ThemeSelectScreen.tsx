import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { imagePackages, loadCustomThemes } from "@/constants/ImagePackages";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Title } from "./HomeScreen";

export default function ThemeSelectScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    loadCustomThemes();
  }, [navigation]);

  return (
    <ThemedView style={styles.container}>
      <Title />
      <ThemedText type="title" style={styles.pickTitle}>
        PICK YOUR GAME
      </ThemedText>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {imagePackages.map((imagePackage, index) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/screens/GameScreen",
                params: { packageIndex: index },
              })
            }
            key={index}
          >
            <LinearGradient
              colors={["#40BFB8", "#6A5ACD", "#E91E63", "#D81B60"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button]}
            >
              <ThemedText type="title" style={styles.buttonText}>
                {imagePackage.theme}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={() => router.push("/screens/CreateGameScreen")}
        >
          <ThemedText type="title" style={styles.buttonText}>
            CREATE YOUR OWN
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#4A0D66",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  titleContainer: {
    backgroundColor: "#40BFB8",
    width: "100%",
    padding: 20,
    marginTop: 10,
    borderRadius: 15,
    marginBottom: 20,
    position: "relative",
  },
  mainTitle: {
    textAlign: "left",
    color: "white",
    fontWeight: "700",
    paddingTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "left",
  },
  titleIconContainer: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  titleIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  pickTitle: {
    // fontSize: 32,
    textAlign: "center",
    // color: "white",
    // marginBottom: 30,
    // fontWeight: "bold",
  },
  scrollContent: {
    // alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: "#40BFB8",
  },
  createButton: {
    marginTop: 20,
  },
  buttonText: {
    // fontSize: 28,
    // color: "white",
    textAlign: "center",
    // fontWeight: "bold",
  },
});
