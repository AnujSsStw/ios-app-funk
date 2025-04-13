import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Title } from "./HomeScreen";
import { ImagePackage, saveCustomTheme } from "@/constants/ImagePackages";

interface CustomItem {
  image?: string;
  audio?: string;
}

export default function CustomGameScreen() {
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [longPressTimeout, setLongPressTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log(params);
    if (params.editTheme) {
      setCustomItems(JSON.parse(params.data as string));
    }
  }, []);

  const pickImage = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newItems = [...customItems];
      newItems[index] = {
        ...newItems[index],
        image: result.assets[0].uri,
      };
      setCustomItems(newItems);
    }
  };

  const startRecording = async (index: number) => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (index: number) => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(undefined);

    if (uri) {
      const newItems = [...customItems];
      newItems[index] = {
        ...newItems[index],
        audio: uri,
      };
      setCustomItems(newItems);
    }
  };

  const playSound = async (index: number) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(undefined);
      setIsPlaying(null);
    }

    const item = customItems[index];
    if (!item?.audio) return;

    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: item.audio,
      });
      setSound(newSound);
      setIsPlaying(index);

      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(null);
          await newSound.unloadAsync();
          setSound(undefined);
        }
      });
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  };

  const handleAudioPress = (index: number) => {
    if (customItems[index]?.audio) {
      // Start a timeout for long press
      const timeout = setTimeout(() => {
        Alert.alert("Re-record Audio", "Do you want to record a new audio?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Re-record",
            style: "destructive",
            onPress: () => {
              startRecording(index);
            },
          },
        ]);
      }, 500);
      setLongPressTimeout(timeout);
    } else {
      // Start recording if no audio exists
      startRecording(index);
    }
  };

  const handleAudioPressOut = (index: number) => {
    // Clear long press timeout
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }

    if (recording) {
      stopRecording(index);
    } else if (customItems[index]?.audio && !recording) {
      // Only play if it was a short press (no recording in progress)
      playSound(index);
    }
  };

  const finishGame = async () => {
    console.log(params);
    if (customItems.length !== 9) {
      Alert.alert("Incomplete", "Please record audio for all images");
      return;
    }

    if (customItems.some((item) => !item.image)) {
      Alert.alert("Incomplete", "Please select an image for all items");
      return;
    }

    if (customItems.some((item) => !item.audio)) {
      Alert.alert("Incomplete", "Please record audio for all items");
      return;
    }

    // Save or update the custom theme
    const customTheme: ImagePackage = {
      theme: params.theme as string,
      items: customItems
        .filter((img) => img !== null)
        .map((img, index) => ({
          name: `Custom ${index + 1}`,
          image: img.image as string,
          isCustom: true,
          audio: img.audio as string,
          theme: params.theme as string,
        })),
    };

    await saveCustomTheme(customTheme, params?.editTheme ? true : false);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {params.theme ?? params.editTheme}
          </ThemedText>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => router.push("/info")}
          >
            <ThemedText style={styles.infoButtonText}>ⓘ</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={() => pickImage(index)}
                >
                  {customItems[index]?.image ? (
                    <Image
                      source={{ uri: customItems[index].image }}
                      style={styles.image}
                    />
                  ) : (
                    <ThemedText
                      type="subtitle"
                      style={{
                        color: "#4361ee",
                      }}
                    >
                      Pick Image
                    </ThemedText>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    recording && styles.recording,
                    isPlaying === index && styles.playing,
                    customItems[index]?.audio && styles.hasAudio,
                  ]}
                  onPressIn={() => handleAudioPress(index)}
                  onPressOut={() => handleAudioPressOut(index)}
                >
                  <ThemedText style={styles.recordButtonText}>
                    {isPlaying === index
                      ? "■"
                      : customItems[index]?.audio
                      ? "▶"
                      : "🎤"}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        <TouchableOpacity
          style={[
            {
              marginTop: 30,
              backgroundColor: "#40BFBD",
              padding: 15,
              borderRadius: 12,
            },
          ]}
          onPress={finishGame}
        >
          <ThemedText type="title" style={{ textAlign: "center" }}>
            {params.editTheme ? "UPDATE" : "FINISH"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <Title />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>← BACK</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A2B82",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 30,
  },
  title: {
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#40BFBD",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#4361ee",
  },
  imageButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  recordButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  recording: {
    backgroundColor: "#f44336",
  },
  playing: {
    backgroundColor: "#2196F3",
  },
  hasAudio: {
    backgroundColor: "#4CAF50",
  },
  recordButtonText: {
    color: "white",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  backButton: {
    backgroundColor: "#40BFBD",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  guideContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  guideTitle: {
    marginBottom: 10,
    color: "white",
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  guideButton: {
    position: "relative",
    marginRight: 10,
    width: 24,
    height: 24,
  },
  guideText: {
    color: "white",
    opacity: 0.9,
  },
});
