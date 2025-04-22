import { ThemedText } from "@/components/ThemedText";
import { ImagePackage, saveCustomTheme } from "@/constants/ImagePackages";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useCustomItems } from "../store";
import { Title } from "./HomeScreen";

export default function CustomGameScreen() {
  const { customItems, setCustomItems, resetCustomItems } = useCustomItems();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.editTheme) {
      console.log("running edit theme", params);
      const themeData = JSON.parse(params.data as string);
      const customItemsData = themeData.map((item: any, index: number) => ({
        image: item.image,
        audio: item.audio,
        index: index,
      }));

      setCustomItems(customItemsData);
    }
    return () => {
      resetCustomItems();
    };
  }, []);

  const pickImage = async (index: number) => {
    router.push({
      pathname: "/image-picker",
      params: { index },
    });
  };

  const finishGame = async () => {
    console.log("while saving", customItems.length);
    if (customItems.length !== 9) {
      Alert.alert("Incomplete", "Please complete all items");
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
      theme: params.editTheme
        ? (params.editTheme as string)
        : (params.theme as string),
      items: customItems
        .filter((img) => img !== null)
        .map((img, index) => ({
          name: `Custom ${index + 1}`,
          image: img.image as string,
          isCustom: true,
          audio: img.audio as string,
          theme: params.editTheme
            ? (params.editTheme as string)
            : (params.theme as string),
        })),
    };

    await saveCustomTheme(customTheme, params?.editTheme ? true : false);
    router.replace("/screens/SelectCreateEditScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {params.theme ?? params.editTheme}
          </ThemedText>
          {/* <TouchableOpacity
            style={styles.infoButton}
            onPress={() => router.push("/info")}
          >
            <ThemedText style={styles.infoButtonText}>ⓘ</ThemedText>
          </TouchableOpacity> */}
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
                  {customItems.find((item) => item.index === index)?.image ? (
                    <Image
                      source={{
                        uri: customItems.find((item) => item.index === index)
                          ?.image,
                      }}
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
              </View>
            ))}
        </View>

        <ImageBackground
          source={require("../../assets/background.png")}
          imageStyle={{
            borderRadius: 15,
          }}
          style={{
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={[
              {
                // marginTop: 30,
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
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <Title />
      <ImageBackground
        source={require("../../assets/background.png")}
        imageStyle={{
          borderRadius: 15,
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backButtonText}>← BACK</ThemedText>
        </TouchableOpacity>
      </ImageBackground>
    </View>
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
