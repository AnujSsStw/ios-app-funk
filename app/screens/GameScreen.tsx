import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAudio } from '@/hooks/useAudio';

const initialAnimals = [
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

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const { width, height } = Dimensions.get('window'); // Get both width and height
const spacing = 10;
const numColumns = 3;
const itemWidth = (width - (spacing * (numColumns + 1))) / numColumns;

export default function GameScreen() {
  const [animals, setAnimals] = useState(shuffleArray(initialAnimals));
  const [matches, setMatches] = useState<boolean[]>(Array(initialAnimals.length).fill(false));
  const [targetAnimal, setTargetAnimal] = useState<number>(0);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const { playCorrectSound, playInstructions } = useAudio();
  const fadeAnim = new Animated.Value(1); // For fade animation

  useEffect(() => {
    setAnimals(shuffleArray(initialAnimals));
    setMatches(Array(initialAnimals.length).fill(false));
    setTargetAnimal(0);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      playInstructions(`Find the ${animals[targetAnimal].name}`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [targetAnimal]);

  useEffect(() => {
    if (matches.every(match => match)) {
      setShowWinScreen(true);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    }
  }, [matches]);

  const handlePress = (index: number) => {
    if (matches[index]) {
      return; // Ignore taps on already correct answers
    }

    if (index === targetAnimal) {
      playCorrectSound();
      const newMatches = [...matches];
      newMatches[index] = true;
      setMatches(newMatches);

      // Check if game is complete
      if (newMatches.every(match => match)) {
        setShowWinScreen(true);
        return;
      }

      // Find next available animal that hasn't been correctly answered
      let nextAnimal;
      do {
        nextAnimal = Math.floor(Math.random() * animals.length);
      } while (newMatches[nextAnimal]);

      setTargetAnimal(nextAnimal);
    } else {
      // Handle wrong answer (optional - add visual feedback)
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
      <ThemedText style={styles.title}>Find the {animals[targetAnimal].name}</ThemedText>
      <View style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.animalButton, matches[index] && styles.correctAnswer]}
            onPress={() => handlePress(index)}>
            <ThemedText style={styles.animalText}>{animal.image}</ThemedText>
            {matches[index] && (
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
  correctAnswer: {
    backgroundColor: '#d4edda', // Light green
  },
  correctCheck: {
    position: 'absolute',
    fontSize: itemWidth * 0.3,
    color: 'green',
    textAlign: 'center',
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