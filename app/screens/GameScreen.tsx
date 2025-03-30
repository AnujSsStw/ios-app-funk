
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAudio } from '@/hooks/useAudio';

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
  const { playCorrectSound } = useAudio();

  useEffect(() => {
    // Shuffle animals and set initial target
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    setShuffledAnimals(shuffled);
    setCurrentAnimal(0);
    // TODO: Play audio "Where is the [shuffled[0].name]?"
  }, []);

  const handleAnimalPress = async (selectedIndex: number) => {
    const isCorrect = selectedIndex === currentAnimal;
    setFeedback({ index: selectedIndex, correct: isCorrect });

    if (isCorrect) {
      await playCorrectSound();
      setTimeout(() => {
        setFeedback(null);
        const nextAnimal = (currentAnimal + 1) % animals.length;
        setCurrentAnimal(nextAnimal);
        // TODO: Play audio "Where is the [shuffledAnimals[nextAnimal].name]?"
      }, 1000);
    } else {
      // TODO: Play audio "Where is the [shuffledAnimals[currentAnimal].name]?" again
      setTimeout(() => {
        setFeedback(null);
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
              <View style={styles.feedbackOverlay}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  feedbackText: {
    fontSize: 60,
    color: '#4CAF50', // Green for correct
  },
});
