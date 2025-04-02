
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAudio } from '@/hooks/useAudio';
import { useLocalSearchParams } from 'expo-router';
import { imagePackages } from '@/constants/ImagePackages';

const { width, height } = Dimensions.get('window');
const spacing = 10;
const numColumns = 3;
const itemWidth = (width - (spacing * (numColumns + 1))) / numColumns;

function shuffleArray(array) {
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
  
  const [currentItem, setCurrentItem] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [shuffledItems, setShuffledItems] = useState(() => shuffleArray([...items]));
  const { playCorrectSound, playInstructions } = useAudio();
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      playInstructions(`Find the ${shuffledItems[currentItem].name}`);
    }, 500);
    return () => clearTimeout(timeout);
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
      setTimeout(() => {
        playInstructions(`Find the ${shuffledItems[currentItem].name}`);
      }, 500);
    }
  };

  const startNewGame = () => {
    setShuffledItems(shuffleArray([...items]));
    setShowWinScreen(false);
    setCurrentItem(0);
    setCorrectAnswers([]);
  };

  useEffect(() => {
    if (showWinScreen) {
      const timer = setTimeout(() => {
        router.replace('/screens/HomeScreen');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWinScreen]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Find the {shuffledItems[currentItem].name}</ThemedText>
      <View style={styles.grid}>
        {shuffledItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.animalButton, wrongAnswer === index && styles.wrongAnswer, correctAnswers.includes(index) && styles.correctAnswer]}
            onPress={() => handlePress(index)}>
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
      {showWinScreen && (
        <Animated.View style={[styles.winScreen, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={startNewGame} style={{ flex: 1 }}>
            <ThemedText style={styles.winText}>You Win!</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  customImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingTop: height * 0.1,
    padding: spacing,
    backgroundColor: '#E91E63',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: spacing,
    height: itemWidth * 3 + spacing * 2,
  },
  animalButton: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  animalText: {
    fontSize: itemWidth * 0.5,
    lineHeight: itemWidth * 0.6,
    textAlign: 'center',
  },
  wrongAnswer: {
    backgroundColor: '#ffebee',
  },
  wrongX: {
    position: 'absolute',
    fontSize: itemWidth * 0.5,
    color: 'red',
    width: itemWidth,
    height: itemWidth,
    textAlign: 'center',
    lineHeight: itemWidth,
    zIndex: 2,
    left: 0,
    top: 0,
  },
  correctAnswer: {
    backgroundColor: '#d4edda',
  },
  correctCheck: {
    position: 'absolute',
    fontSize: itemWidth * 0.5,
    color: 'green',
    width: itemWidth,
    height: itemWidth,
    textAlign: 'center',
    lineHeight: itemWidth,
    zIndex: 2,
    left: 0,
    top: 0,
  },
  winScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.3,
    zIndex: 1000,
  },
  winText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    paddingVertical: 20,
  },
});
