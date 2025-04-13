import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Linking,
  Image,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Title />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screens/ThemeSelectScreen")}
        >
          <ThemedText type="title" style={styles.buttonText}>
            START{"\n"}NEW{"\n"}GAME!
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/screens/SelectCreateEditScreen")}
        >
          <ThemedText type="title" style={styles.footerButtonText}>
            CREATE YOUR OWN
          </ThemedText>
        </TouchableOpacity>
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
              <AntDesign name="questioncircle" size={60} color="#E91E63" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

export const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <ThemedText type="title" style={styles.mainTitle}>
        TAPPYTALK
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        The language-learning game you create.
      </ThemedText>
      <View style={styles.titleIconContainer}>
        <Image
          source={require("../../assets/bg-rm.png")}
          style={styles.titleIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A0D66",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    alignItems: "center",
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
    bottom: -30,
    right: -10,
    width: 100,
    height: 100,
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
    backgroundColor: "#40BFB8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 56,
    transform: [{ rotate: "-30deg" }],
  },
  footer: {
    width: "100%",
    padding: 20,
    gap: 10,
  },
  footerButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#40BFB8",
    alignItems: "center",
    borderRadius: 10,
  },
  footerButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  helpButton: {
    backgroundColor: "#40BFB8",
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
    top: -18,
  },
});
