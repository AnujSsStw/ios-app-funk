
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const AUDIO_FILES = {
  pig: require('@/assets/audio/pig.mp3'),
  cow: require('@/assets/audio/cow.mp3'),
  // Add more audio files here
};

const DEFAULT_ANIMALS = [
  { id: 1, name: 'pig', image: require('@/assets/images/animals/pig.png'), audio: AUDIO_FILES.pig },
  { id: 2, name: 'cow', image: require('@/assets/images/animals/cow.png'), audio: AUDIO_FILES.cow },
  // Add more animals here
];

export default function GameScreen() {
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [selectedTiles, setSelectedTiles] = useState({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    shuffleAnimals();
    playNextClue();
  }, []);

  const shuffleAnimals = () => {
    const shuffled = [...DEFAULT_ANIMALS].sort(() => Math.random() - 0.5);
    setAnimals(shuffled);
    setCurrentAnimal(shuffled[0]);
  };

  const playNextClue = async () => {
    if (!currentAnimal) return;
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(currentAnimal.audio);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
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
        playNextClue();
      }
    } else {
      setSelectedTiles({ ...selectedTiles, [animal.id]: 'wrong' });
      setTimeout(() => {
        setSelectedTiles({ ...selectedTiles, [animal.id]: null });
        playNextClue();
      }, 1000);
    }
  };

  if (completed) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Congratulations! 🎉</ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.replace('/')}>
          <ThemedText style={styles.buttonText}>Play Again</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.grid}>
        {animals.map((animal) => (
          <TouchableOpacity 
            key={animal.id}
            style={styles.tile}
            onPress={() => handleTilePress(animal)}>
            <Image source={animal.image} style={styles.image} />
            {selectedTiles[animal.id] === 'correct' && (
              <View style={styles.checkmark}>
                <ThemedText style={styles.mark}>✓</ThemedText>
              </View>
            )}
            {selectedTiles[animal.id] === 'wrong' && (
              <View style={styles.xmark}>
                <ThemedText style={styles.mark}>✗</ThemedText>
              </View>
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
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  checkmark: {
    position: 'absolute',
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xmark: {
    position: 'absolute',
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    fontSize: 40,
    color: 'white',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
