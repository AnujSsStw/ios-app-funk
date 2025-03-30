
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAudio } from '../../hooks/useAudio';

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
  const [currentAnimal, setCurrentAnimal] = useState<number>(-1);
  const [shuffledAnimals, setShuffledAnimals] = useState([...animals]);
  const [feedback, setFeedback] = useState<{index: number, correct: boolean} | null>(null);
  const { playCorrectSound, playInstructions } = useAudio();

  useEffect(() => {
    const startGame = async () => {
      const shuffled = [...animals].sort(() => Math.random() - 0.5);
      setShuffledAnimals(shuffled);
      setCurrentAnimal(0);
      await playInstructions(shuffled[0].name);
    };
    startGame();
  }, []);

  const handleAnimalPress = async (selectedIndex: number) => {
    const isCorrect = selectedIndex === currentAnimal;
    setFeedback({ index: selectedIndex, correct: isCorrect });

    if (isCorrect) {
      await playCorrectSound();
      setTimeout(async () => {
        setFeedback(null);
        const nextAnimal = (currentAnimal + 1) % animals.length;
        setCurrentAnimal(nextAnimal);
        await playInstructions(shuffledAnimals[nextAnimal].name);
      }, 1000);
    } else {
      setTimeout(async () => {
        setFeedback(null);
        await playInstructions(shuffledAnimals[currentAnimal].name);
      }, 1000);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.grid}>
        {shuffledAnimals.map((animal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.animalButton}
            onPress={() => handleAnimalPress(index)}>
            <ThemedText style={styles.animalEmoji}>{animal.image}</ThemedText>
            {feedback && feedback.index === index && (
              <View style={[styles.feedbackOverlay, { backgroundColor: feedback.correct ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)' }]}>
                <ThemedText style={styles.feedbackText}>
                  {feedback.correct ? '✓' : '✗'}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: windowWidth,
    padding: 10,
  },
  animalButton: {
    width: windowWidth / 3 - 20,
    height: windowWidth / 3 - 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    position: 'relative',
  },
  animalEmoji: {
    fontSize: 50,
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  feedbackText: {
    fontSize: 40,
    color: '#fff',
  },
});
