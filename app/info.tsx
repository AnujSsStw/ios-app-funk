import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Info() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.mainTitle}>
            How to Play
          </ThemedText>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Recording Instructions
            </ThemedText>
            <View style={styles.guideItem}>
              <View style={[styles.recordButton, styles.guideButton]}>
                <ThemedText style={styles.recordButtonText}>🎤</ThemedText>
              </View>
              <View style={styles.instructionContainer}>
                <ThemedText type="subtitle" style={styles.guideText}>
                  Record New Audio
                </ThemedText>
                <ThemedText style={styles.guideSubtext}>
                  Press and hold to start recording. Release when finished.
                </ThemedText>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View
                style={[
                  styles.recordButton,
                  styles.hasAudio,
                  styles.guideButton,
                ]}
              >
                <ThemedText style={styles.recordButtonText}>▶</ThemedText>
              </View>
              <View style={styles.instructionContainer}>
                <ThemedText type="subtitle" style={styles.guideText}>
                  Play Recording
                </ThemedText>
                <ThemedText style={styles.guideSubtext}>
                  Tap once to play the recorded audio
                </ThemedText>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View
                style={[
                  styles.recordButton,
                  styles.playing,
                  styles.guideButton,
                ]}
              >
                <ThemedText style={styles.recordButtonText}>■</ThemedText>
              </View>
              <View style={styles.instructionContainer}>
                <ThemedText type="subtitle" style={styles.guideText}>
                  Stop Playing
                </ThemedText>
                <ThemedText style={styles.guideSubtext}>
                  Tap again to stop the playback
                </ThemedText>
              </View>
            </View>

            <View style={styles.guideItem}>
              <View
                style={[
                  styles.recordButton,
                  styles.hasAudio,
                  styles.guideButton,
                ]}
              >
                <ThemedText style={styles.recordButtonText}>▶</ThemedText>
              </View>
              <View style={styles.instructionContainer}>
                <ThemedText type="subtitle" style={styles.guideText}>
                  Re-record Audio
                </ThemedText>
                <ThemedText style={styles.guideSubtext}>
                  Long press on any existing recording to re-record
                </ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Image Instructions
            </ThemedText>
            <View style={styles.guideItem}>
              <View style={styles.imageGuideButton}>
                <ThemedText style={styles.imageGuideText}>+</ThemedText>
              </View>
              <View style={styles.instructionContainer}>
                <ThemedText type="subtitle" style={styles.guideText}>
                  Add Images
                </ThemedText>
                <ThemedText style={styles.guideSubtext}>
                  Tap any empty slot to select an image from your gallery
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>← Back to Game</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f2865f286ee",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  mainTitle: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#40BFBD",
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 15,
    borderRadius: 12,
  },
  instructionContainer: {
    flex: 1,
  },
  guideButton: {
    position: "relative",
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  imageGuideButton: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  imageGuideText: {
    fontSize: 24,
    color: "#4361ee",
    fontWeight: "bold",
  },
  recordButton: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  hasAudio: {
    backgroundColor: "#4CAF50",
  },
  playing: {
    backgroundColor: "#2196F3",
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
  },
  guideText: {
    color: "white",
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  guideSubtext: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#40BFBD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
