
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

const { width } = Dimensions.get('window');
const spacing = 10;
const numColumns = 3;
const itemWidth = (width - (spacing * (numColumns + 1))) / numColumns;

export default function GameScreen() {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
  const { playCorrectSound, playInstructions } = useAudio();

  useEffect(() => {
    const timeout = setTimeout(() => {
      playInstructions(`Find the ${animals[currentAnimal].name}`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentAnimal]);

  const handlePress = (index: number) => {
    if (index === currentAnimal) {
      playCorrectSound();
      setWrongAnswer(null);
      setCurrentAnimal(Math.floor(Math.random() * animals.length));
    } else {
      setWrongAnswer(index);
      setTimeout(() => {
        playInstructions(`Find the ${animals[currentAnimal].name}`);
      }, 500);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Find the {animals[currentAnimal].name}</ThemedText>
      <View style={styles.grid}>
        {animals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.animalButton, wrongAnswer === index && styles.wrongAnswer]}
            onPress={() => handlePress(index)}>
            <ThemedText style={styles.animalText}>{animal.image}</ThemedText>
            {wrongAnswer === index && (
              <ThemedText style={styles.wrongX}>❌</ThemedText>
            )}
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
  },
  animalText: {
    fontSize: 40,
  },
  wrongAnswer: {
    backgroundColor: '#ffebee',
  },
  wrongX: {
    position: 'absolute',
    fontSize: 30,
  },
});
