import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { useAudio } from '@/hooks/useAudio';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const animals = [
  { name: 'Sunflower', image: '🌻' },
  { name: 'Mountain', image: '⛰️' },
  { name: 'Forest', image: '🌲' },
  { name: 'Cat', image: '🐱' },
  { name: 'Road', image: '🛣️' },
  { name: 'Ice Cream', image: '🍦' },
  { name: 'Snow Peak', image: '🏔️' },
  { name: 'Strawberry', image: '🍓' },
  { name: 'Cloud', image: '☁️' },
  { name: 'Tree', image: '🌳' },
  { name: 'Lake', image: '🌊' },
  { name: 'Grass', image: '🌿' }
];

const { width: screenWidth } = Dimensions.get('window');
const itemsPerRow = 3;
//const spacing = 2; // Removed fixed spacing
//const availableWidth = screenWidth; // Removed fixed width calculation
//const itemSize = (availableWidth - (spacing * (itemsPerRow + 1))) / itemsPerRow; // Removed fixed item size calculation

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { playCorrectSound, playInstructions } = useAudio();

  useEffect(() => {
    if (currentAnimal === 0) {
      const timeout = setTimeout(() => {
        playInstructions(animals[currentAnimal].name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleAnimalPress = async (index) => {
    setSelectedAnimal(index);
    if (index === currentAnimal) {
      await playCorrectSound();
      setSelectedAnimal(null);
      const nextAnimal = Math.floor(Math.random() * animals.length);
      setCurrentAnimal(nextAnimal);
      setTimeout(() => {
        playInstructions(animals[nextAnimal].name);
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedAnimal(null);
        playInstructions(animals[currentAnimal].name);
      }, 1000);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.animalButton,
              selectedAnimal === index && (index === currentAnimal ? styles.correctSelection : styles.wrongSelection)
            ]}
            onPress={() => handleAnimalPress(index)}
          >
            <ThemedText style={styles.animalEmoji}>{animal.image}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Distribute items evenly
    alignItems: 'center',
  },
  animalButton: {
    flex: 1/itemsPerRow - 0.02, // Adjust this for spacing
    aspectRatio: 1,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalEmoji: {
    flex: 1, // Allow emoji to scale to fill the button
  },
  correctSelection: {
    backgroundColor: '#4CAF50',
  },
  wrongSelection: {
    backgroundColor: '#FF5252',
  }
});