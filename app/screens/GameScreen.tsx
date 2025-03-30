import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
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

const { width: screenWidth } = Dimensions.get('window');
const itemsPerRow = 3;
const spacing = 10;
const availableWidth = screenWidth - (spacing * 2);
const itemSize = (availableWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const { playCorrectSound, playInstructions } = useAudio();

  useEffect(() => {
    playInstructions(`Where is the ${animals[currentAnimal].name}?`);
  }, [currentAnimal]);

  const handlePress = (index: number) => {
    if (index === currentAnimal) {
      playCorrectSound();
      setCurrentAnimal(Math.floor(Math.random() * animals.length));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Find the {animals[currentAnimal].name}</ThemedText>
      <View style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.animalButton]}
            onPress={() => handlePress(index)}>
            <ThemedText style={styles.animalText}>{animal.image}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
    gap: spacing,
  },
  animalButton: {
    width: itemSize,
    height: itemSize,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animalText: {
    fontSize: 32,
  },
});