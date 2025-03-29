import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DEFAULT_ANIMALS = [
  { id: 1, name: 'Pig', clue: "Where's the pig?" },
  { id: 2, name: 'Cow', clue: "Can you find the cow?" },
  { id: 3, name: 'Dog', clue: "Where's the dog?" },
];

export default function GameScreen() {
  const [animals, setAnimals] = useState(DEFAULT_ANIMALS);
  const [currentAnimal, setCurrentAnimal] = useState(DEFAULT_ANIMALS[0]);
  const [selectedTiles, setSelectedTiles] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    shuffleAnimals();
  }, []);

  const shuffleAnimals = () => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    setAnimals(shuffled);
    setCurrentAnimal(shuffled[0]);
  };

  const handleTilePress = (animal) => {
    if (completed) return;

    if (animal.id === currentAnimal.id) {
      setSelectedTiles({ ...selectedTiles, [animal.id]: 'correct' });
      const remainingAnimals = animals.filter(a => !selectedTiles[a.id]);
      if (remainingAnimals.length === 1) {
        setCompleted(true);
      } else {
        setCurrentAnimal(remainingAnimals[1]);
      }
    } else {
      setSelectedTiles({ ...selectedTiles, [animal.id]: 'wrong' });
      setTimeout(() => {
        setSelectedTiles({ ...selectedTiles, [animal.id]: null });
      }, 1000);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Animal Game</ThemedText>
      <ThemedText style={styles.clue}>{currentAnimal.clue}</ThemedText>

      <ThemedView style={styles.grid}>
        {animals.map((animal) => (
          <TouchableOpacity 
            key={animal.id}
            style={[
              styles.animalButton,
              selectedTiles[animal.id] === 'correct' && styles.correctButton,
              selectedTiles[animal.id] === 'wrong' && styles.wrongButton,
            ]}
            onPress={() => handleTilePress(animal)}
          >
            <ThemedText style={styles.animalText}>{animal.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {completed && (
        <TouchableOpacity 
          style={styles.playAgainButton}
          onPress={() => {
            setCompleted(false);
            setSelectedTiles({});
            shuffleAnimals();
          }}
        >
          <ThemedText style={styles.buttonText}>Play Again</ThemedText>
        </TouchableOpacity>
      )}
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
  clue: {
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
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    margin: 5,
    minWidth: 100,
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  wrongButton: {
    backgroundColor: '#f44336',
  },
  animalText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});