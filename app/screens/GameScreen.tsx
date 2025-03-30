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
  { name: 'Cloud', image: '☁️' }
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const itemsPerRow = 3;
const spacing = 2;
const availableWidth = screenWidth;
const itemSize = (availableWidth - (spacing * (itemsPerRow + 1))) / itemsPerRow;

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing,
  },
  animalButton: {
    width: itemSize,
    height: itemSize,
    margin: spacing,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animalEmoji: {
    fontSize: itemSize * 0.5,
  },
  correctSelection: {
    backgroundColor: '#4CAF50',
  },
  wrongSelection: {
    backgroundColor: '#FF5252',
  }
});