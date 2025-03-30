import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAudio } from '@/hooks/useAudio';

const animals = [
  { name: 'Sunflower', image: '🌻' },
  { name: 'Mountain', image: '⛰️' },
  { name: 'Forest', image: '🌲' },
  { name: 'Cat', image: '🐱' },
  { name: 'Road', image: '🛣️' },
  { name: 'Ice Cream', image: '🍦' },
  { name: 'Snow Peak', image: '🏔️' },
  { name: 'Strawberry', image: '🍓' },
  { name: 'Cloud', image: '☁️' }
];

const { width, height } = Dimensions.get('window'); // Get both width and height
const spacing = 10;
const numColumns = 3;
const itemWidth = (width - (spacing * (numColumns + 1))) / numColumns;

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]); // Track correct answers
  const [showWinScreen, setShowWinScreen] = useState(false); // State for win screen
  const { playCorrectSound, playInstructions } = useAudio();
  const fadeAnim = new Animated.Value(1); // For fade animation

  useEffect(() => {
    const timeout = setTimeout(() => {
      playInstructions(`Find the ${animals[currentAnimal].name}`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentAnimal]);

  useEffect(() => {
    if (correctAnswers.length === animals.length) {
      setShowWinScreen(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }
  }, [correctAnswers]);

  const handlePress = (index: number) => {
    if (correctAnswers.includes(index)) {
      return; // Ignore taps on already correct answers
    }

    if (index === currentAnimal) {
      playCorrectSound();
      setWrongAnswer(null);
      const newCorrectAnswers = [...correctAnswers, index];
      setCorrectAnswers(newCorrectAnswers);

      // Check if game is complete
      if (newCorrectAnswers.length === animals.length) {
        setShowWinScreen(true);
        return;
      }

      // Find next available animal that hasn't been correctly answered
      let nextAnimal;
      do {
        nextAnimal = Math.floor(Math.random() * animals.length);
      } while (newCorrectAnswers.includes(nextAnimal));

      setCurrentAnimal(nextAnimal);
    } else {
      setWrongAnswer(index);
      setTimeout(() => {
        playInstructions(`Find the ${animals[currentAnimal].name}`);
      }, 500);
    }
  };

  const handleWinScreenTap = () => {
    router.push('/');
  };

  useEffect(() => {
    if (showWinScreen) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showWinScreen]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Find the {animals[currentAnimal].name}</ThemedText>
      <View style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.animalButton, wrongAnswer === index && styles.wrongAnswer, correctAnswers.includes(index) && styles.correctAnswer]}
            onPress={() => handlePress(index)}>
            <ThemedText style={styles.animalText}>{animal.image}</ThemedText>
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
          <TouchableOpacity onPress={handleWinScreenTap} style={{ flex:1 }}>
            <ThemedText style={styles.winText}>You Win!</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.1, // Add top padding
    padding: spacing,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center', // Added for vertical centering
    padding: spacing,
  },
  animalButton: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing,
    padding: 10,
  },
  animalText: {
    fontSize: itemWidth * 0.5,
    lineHeight: itemWidth * 0.6,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  wrongAnswer: {
    backgroundColor: '#ffebee',
  },
  wrongX: {
    position: 'absolute',
    fontSize: itemWidth * 0.4,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  correctAnswer: {
    backgroundColor: '#d4edda', // Light green
  },
  correctCheck: {
    position: 'absolute',
    fontSize: itemWidth * 0.4,
    color: 'green',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  winScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 200,
    zIndex: 1000,
  },
  winText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
});