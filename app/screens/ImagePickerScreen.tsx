import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCustomItems } from "../store";

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const params = useLocalSearchParams();
  const { insertCustomItem, customItems, updateCustomItem } = useCustomItems();

  useEffect(() => {
    // console.log(customItems);
    if (customItems.length > 0 && params.index !== undefined) {
      const index = parseInt(params.index as string);
      const item = customItems.find((item) => item.index === index);
      console.log("in sel   ", item);
      if (item && item.image) {
        setSelectedImage(item.image);
      }
      if (item && item.audio) {
        setAudioUri(item.audio);
      }
    }
  }, [customItems, params.index]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRecording = async () => {
    if (!isRecording) {
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
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    } else {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(undefined);
      setAudioUri(uri || null);
      setIsRecording(false);
    }
  };

  const playSound = async () => {
    if (!audioUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setIsPlaying(true);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          await sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error("Failed to play sound", err);
      setIsPlaying(false);
    }
  };

  const handleSave = () => {
    if (selectedImage && audioUri) {
      const index = parseInt(params.index as string);
      console.log("index in image picker", index);
      const item = customItems.find((item) => item.index === index);
      if (item) {
        console.log("updating item", item);
        updateCustomItem(index, {
          image: selectedImage,
          audio: audioUri,
          index,
        });
      } else {
        insertCustomItem({
          image: selectedImage,
          audio: audioUri,
          index,
        });
      }
      router.back();
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PressableBackButton />

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer} />
          )}
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <ImageBackground
            source={require("../../assets/background.png")}
            imageStyle={[
              {
                borderRadius: 15,
              },
            ]}
            style={[
              styles.button,
              {
                justifyContent: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleRecording}
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {isRecording ? (
                  <FontAwesome name="circle" size={24} color="red" />
                ) : (
                  <FontAwesome name="circle" size={24} color="green" />
                )}
                <ThemedText type="title" style={styles.buttonText}>
                  {isRecording ? "RECORDING" : "RECORD"}
                </ThemedText>
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            source={require("../../assets/background.png")}
            imageStyle={[
              {
                borderRadius: 15,
              },
            ]}
            style={[styles.button]}
          >
            <TouchableOpacity
              onPress={playSound}
              disabled={!audioUri}
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {isPlaying ? (
                  <FontAwesome name="pause" size={24} color="purple" />
                ) : (
                  <FontAwesome name="play" size={24} color="purple" />
                )}
                <ThemedText type="title" style={styles.buttonText}>
                  {isPlaying ? "PAUSE" : "PLAY"}
                </ThemedText>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
          }}
          style={styles.saveButton}
        >
          <TouchableOpacity onPress={handleSave}>
            <ThemedText type="title" style={styles.buttonText}>
              SAVE
            </ThemedText>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
          }}
          style={styles.removeButton}
        >
          <TouchableOpacity onPress={removeImage}>
            <ThemedText type="title" style={styles.buttonText}>
              REMOVE IMAGE
            </ThemedText>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

import Svg, { Circle, Path } from "react-native-svg";
import { ImageBackground } from "expo-image";

const BackButton = ({
  size = 50,
  color = "#d45d93",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      {/* Background Circle */}
      <Circle cx="25" cy="25" r="23" fill={color} />

      {/* Arrow */}
      <Path
        d="M30 13L16 25L30 37"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export const PressableBackButton = () => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <BackButton size={40} color="#d45d93" />
      <ThemedText style={styles.backButtonText}>Back</ThemedText>
    </TouchableOpacity>
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
  },
  backButton: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    flex: 0.48,
  },
  recordingButton: {
    backgroundColor: "#f44336",
  },
  playingButton: {
    backgroundColor: "#2196F3",
  },
  saveButton: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  removeButton: {
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 23,
    color: "white",
    // fontFamily: "Wedges-Bold",
  },
});
