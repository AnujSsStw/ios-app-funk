
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const animals = [
  { name: 'Lion', image: '🦁' },
  { name: 'Elephant', image: '🐘' },
  { name: 'Giraffe', image: '🦒' },
  { name: 'Monkey', image: '🐒' },
];

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnimalPress = (selectedAnimalIndex) => {
    if (selectedAnimalIndex === currentAnimal) {
      setScore(score + 1);
      setCurrentAnimal(Math.floor(Math.random() * animals.length));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Animal Learning Game</ThemedText>
      <ThemedText style={styles.score}>Score: {score}</ThemedText>
      <ThemedText style={styles.question}>Find the {animals[currentAnimal].name}!</ThemedText>
      <ThemedView style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.animalButton}
            onPress={() => handleAnimalPress(index)}>
            <ThemedText style={styles.animalEmoji}>{animal.image}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  animalButton: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  animalEmoji: {
    fontSize: 40,
  },
});
