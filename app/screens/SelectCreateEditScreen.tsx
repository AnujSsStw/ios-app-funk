import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Title } from "./HomeScreen";
import { imagePackages } from "@/constants/ImagePackages";
import { loadCustomThemes } from "@/constants/ImagePackages";
import { ImagePackage } from "@/constants/ImagePackages";
import { LinearGradient } from "expo-linear-gradient";
import { PressableBackButton } from "./ImagePickerScreen";

export default function SelectCreateEditScreen() {
  const [customThemes, setCustomThemes] = useState<ImagePackage[]>([]);

  useEffect(() => {
    const loadThemes = async () => {
      await loadCustomThemes();
      const themes = imagePackages.filter((pack) =>
        pack.items.some((item) => item.isCustom)
      );
      setCustomThemes(themes);
    };
    loadThemes();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#5f286e",
        flex: 1,
      }}
    >
      <ThemedView style={[styles.container, { paddingHorizontal: 20 }]}>
        <PressableBackButton />
        <Title />
        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
            width: "100%",
            height: "100%",
          }}
          style={{
            marginTop: 70,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() =>
              router.push({
                pathname: "/screens/CreateGameScreen",
              })
            }
          >
            <ThemedText type="title" style={styles.buttonText}>
              New game
            </ThemedText>
          </TouchableOpacity>
        </ImageBackground>

        <ThemedText
          type="title"
          style={[styles.sectionTitle, { marginTop: 20, textAlign: "center" }]}
        >
          Edit
        </ThemedText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {customThemes.length > 0 ? (
            customThemes.map((theme, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: "/screens/CustomGameScreen",
                    params: {
                      editTheme: theme.theme,
                      data: JSON.stringify(theme.items),
                    },
                  })
                }
              >
                <LinearGradient
                  colors={["#4FB3BE", "#9C27B0", "#7B1FA2", "#E91E63"]}
                  style={[styles.button, styles.editButton]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <ThemedText
                    type="title"
                    style={[styles.buttonText, { textAlign: "center" }]}
                  >
                    {theme.theme}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText
              type="subtitle"
              style={[styles.noThemesText, { textAlign: "center" }]}
            >
              Create a new game first.
            </ThemedText>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f286e",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#4FB3BE",
    borderRadius: 15,
    margin: 20,
    position: "relative",
  },
  logo: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  monkeyIcon: {
    width: 60,
    height: 60,
    position: "absolute",
    right: 20,
    top: 20,
    borderRadius: 30,
    backgroundColor: "#E91E63",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#4FB3BE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#E91E63",
  },
  buttonText: {
    color: "white",
  },
  sectionTitle: {
    marginBottom: 20,
  },
  scrollContent: {
    padding: 20,
  },
  noThemesText: {
    textAlign: "center",
  },
});
