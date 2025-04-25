import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Linking,
  Image,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { loadCustomThemes } from "@/constants/ImagePackages";
export default function HomeScreen() {
  useEffect(() => {
    loadCustomThemes();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Title />
        <ImageBackground
          imageStyle={{
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
          source={require("../../assets/background.png")}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/screens/ThemeSelectScreen")}
          >
            <View style={styles.buttonText}>
              <ThemedText style={{ fontSize: 48 }} type="title">
                START{"\n"}NEW{"\n"}GAME!
              </ThemedText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={80}
              color="#EE4C9F"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
          }}
        >
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => router.push("/screens/SelectCreateEditScreen")}
          >
            <ThemedText type="title" style={styles.footerButtonText}>
              CREATE YOUR OWN
            </ThemedText>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
          }}
        >
          <TouchableOpacity
            style={[styles.footerButton, styles.helpButton]}
            onPress={() =>
              Linking.openURL(
                "mailto:garrett@lauringson.com?subject=Help%20%7C%20Send%20Feedback%20TappyTalk"
              )
            }
          >
            <View style={styles.helpButtonContent}>
              <ThemedText type="title" style={styles.footerButtonText}>
                HELP | SEND FEEDBACK
              </ThemedText>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/question-removebg-preview.png")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ThemedView>
  );
}

export const Title = () => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.titleContainer}
      resizeMode="cover"
      imageStyle={{
        borderRadius: 15,
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <ThemedText type="title" style={styles.mainTitle}>
          TAPPYTALK
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          The language-learning{"\n"}game you create.
        </ThemedText>
        <View style={styles.titleIconContainer}>
          <Image
            source={require("../../assets/main_logo.png")}
            style={styles.titleIcon}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f286e",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    padding: 0,
    marginTop: 10,
    borderRadius: 15,
    marginBottom: 20,
    position: "relative",
  },
  mainTitle: {
    // fontSize: 36,
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
    bottom: -70,
    right: -10,
    width: 150,
    height: 150,
    zIndex: 10,
  },
  titleIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  button: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
    borderRadius: 15,
    // backgroundColor: "#40BFB8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    transform: [{ rotate: "-30deg" }],
  },
  footer: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    gap: 10,
  },
  footerButton: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  footerButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  helpButton: {
    // backgroundColor: "#40BFB8",
    position: "relative",
    overflow: "visible",
  },
  helpButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
  },
  iconContainer: {
    position: "absolute",
    right: -25,
    top: -19,
  },
  arrowIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    // transform: [{ rotate: "-30deg" }],
  },
});
