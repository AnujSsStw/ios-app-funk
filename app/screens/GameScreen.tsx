import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  Platform,
} from "react-native";
import { Audio } from "expo-av";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAudio } from "@/hooks/useAudio";
import { useLocalSearchParams } from "expo-router";
import { imagePackages } from "@/constants/ImagePackages";
import { Footer } from "./CustomGameScreen";

const { width, height } = Dimensions.get("window");
const spacing = 10;
const numColumns = 3;
const itemWidth = (width - spacing * (numColumns + 1)) / numColumns;

function shuffleArray(
  array: { name: string; image: string; isCustom?: boolean; audio?: string }[]
) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function GameScreen() {
  const { packageIndex } = useLocalSearchParams();
  const selectedPackage = imagePackages[Number(packageIndex)];
  const items = selectedPackage.items;

  const [currentItem, setCurrentItem] = useState(() =>
    Math.floor(Math.random() * items.length)
  );
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [shuffledItems, setShuffledItems] = useState(() =>
    shuffleArray([...items])
  );
  const { playCorrectSound, playInstructions } = useAudio();
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    let sound: Audio.Sound;
    const playAudio = async () => {
      try {
        if (shuffledItems[currentItem].isCustom) {
          if (shuffledItems[currentItem].audio) {
            const { sound: audioSound } = await Audio.Sound.createAsync({
              uri: shuffledItems[currentItem].audio,
            });
            sound = audioSound;
            await sound.playAsync();
          }
        } else {
          playInstructions(`Find the ${shuffledItems[currentItem].name}`);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    const timeout = setTimeout(playAudio, 500);

    return () => {
      clearTimeout(timeout);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentItem]);

  useEffect(() => {
    if (correctAnswers.length === items.length) {
      setShowWinScreen(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }
  }, [correctAnswers]);

  useEffect(() => {
    if (showWinScreen) {
      const timer = setTimeout(() => {
        router.replace("/screens/HomeScreen");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWinScreen]);

  const handlePress = (index: number) => {
    if (correctAnswers.includes(index)) return;

    if (index === currentItem) {
      playCorrectSound();
      setWrongAnswer(null);
      const newCorrectAnswers = [...correctAnswers, index];
      setCorrectAnswers(newCorrectAnswers);

      if (newCorrectAnswers.length === items.length) {
        setShowWinScreen(true);
        return;
      }

      let nextItem;
      do {
        nextItem = Math.floor(Math.random() * items.length);
      } while (newCorrectAnswers.includes(nextItem));

      setCurrentItem(nextItem);
    } else {
      setWrongAnswer(index);
      setTimeout(async () => {
        if (
          shuffledItems[currentItem].isCustom &&
          shuffledItems[currentItem].audio
        ) {
          const { sound } = await Audio.Sound.createAsync({
            uri: shuffledItems[currentItem].audio,
          });
          await sound.playAsync();
        } else {
          playInstructions(`Find the ${shuffledItems[currentItem].name}`);
        }
      }, 500);
    }
  };

  const startNewGame = () => {
    setShuffledItems(shuffleArray([...items]));
    setShowWinScreen(false);
    setCurrentItem(0);
    setCorrectAnswers([]);
  };

  return (
    <ThemedView style={styles.container}>
      {shuffledItems[currentItem] && (
        <ThemedText type="title" style={styles.title}>
          Find the {/* @ts-ignore */}
          {shuffledItems[currentItem].theme ?? shuffledItems[currentItem].name}
        </ThemedText>
      )}
      <View style={styles.grid}>
        {shuffledItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.animalButton,
              wrongAnswer === index && styles.wrongAnswer,
              correctAnswers.includes(index) && styles.correctAnswer,
            ]}
            onPress={() => handlePress(index)}
          >
            {item.isCustom ? (
              <Image source={{ uri: item.image }} style={styles.customImage} />
            ) : (
              <ThemedText style={styles.animalText}>{item.image}</ThemedText>
            )}
            {wrongAnswer === index && (
              <ThemedText style={styles.wrongX}>❌</ThemedText>
            )}
            {correctAnswers.includes(index) && (
              <ThemedText style={styles.correctCheck}>✅</ThemedText>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Footer />
      {showWinScreen && (
        <Animated.View style={[styles.winScreen, { opacity: fadeAnim }]}>
          <TouchableOpacity
            onPress={startNewGame}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText type="title" style={styles.winText}>
              You Win!
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A2E85", // Purple background
    padding: 0,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    // color: "#FFFFFF",
    // backgroundColor: "#6344A6", // Slightly lighter purple for title
    paddingVertical: 15,
    marginTop: 0,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing,
    padding: spacing,
    flex: 1,
  },
  animalButton: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animalText: {
    fontSize: itemWidth * 0.5,
    lineHeight: itemWidth * 0.6,
    textAlign: "center",
  },
  wrongAnswer: {
    backgroundColor: "#ffebee",
  },
  correctAnswer: {
    backgroundColor: "#d4edda",
  },
  wrongX: {
    position: "absolute",
    fontSize: itemWidth * 0.5,
    color: "red",
    width: itemWidth,
    height: itemWidth,
    textAlign: "center",
    lineHeight: itemWidth,
    zIndex: 2,
  },
  correctCheck: {
    position: "absolute",
    fontSize: itemWidth * 0.5,
    color: "green",
    width: itemWidth,
    height: itemWidth,
    textAlign: "center",
    lineHeight: itemWidth,
    zIndex: 2,
  },
  winScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  winText: {
    // fontSize: 48,
    // fontWeight: "bold",
    // color: "#fff",
    textAlign: "center",
  },
  bottomBar: {
    backgroundColor: "#45C9C2", // Teal color
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  mascot: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  appTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  customImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
