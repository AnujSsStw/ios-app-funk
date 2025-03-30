
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Audio } from 'expo-av';

const animals = [
  { name: 'Lion', image: '🦁' },
  { name: 'Elephant', image: '🐘' },
  { name: 'Giraffe', image: '🦒' },
  { name: 'Monkey', image: '🐒' },
  { name: 'Tiger', image: '🐯' },
  { name: 'Penguin', image: '🐧' },
  { name: 'Bear', image: '🐻' },
  { name: 'Rabbit', image: '🐰' },
  { name: 'Koala', image: '🐨' },
  { name: 'Fox', image: '🦊' },
  { name: 'Panda', image: '🐼' },
  { name: 'Pig', image: '🐷' },
];

const windowWidth = Dimensions.get('window').width;

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);

  const handleAnimalPress = (selectedAnimalIndex) => {
    if (selectedAnimalIndex === currentAnimal) {
      setCurrentAnimal(Math.floor(Math.random() * animals.length));
    }
  };

  return (
    <ThemedView style={styles.container}>
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
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  animalButton: {
    width: windowWidth / 3,
    height: windowWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  animalEmoji: {
    fontSize: 50,
  },
});
