
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const DEFAULT_ANIMALS = [
  { id: 1, name: 'Pig', clue: "Where's the pig?" },
  { id: 2, name: 'Cow', clue: "Can you find the cow?" },
  { id: 3, name: 'Dog', clue: "Where's the dog?" },
];

export default function GameScreen() {
  const [currentAnimal] = useState(DEFAULT_ANIMALS[0]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Animal Game</ThemedText>
      <ThemedText style={styles.clue}>{currentAnimal.clue}</ThemedText>
      
      <TouchableOpacity 
        style={styles.animalButton}
        onPress={() => router.push('/')}
      >
        <ThemedText style={styles.animalText}>{currentAnimal.name}</ThemedText>
      </TouchableOpacity>
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
  animalButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
  },
  animalText: {
    color: 'white',
    fontSize: 20,
  },
});

const DEFAULT_ANIMALS = [
  { id: 1, name: 'pig', image: require('../../assets/images/placeholder.png'), clue: "Where's the pig?" },
  { id: 2, name: 'cow', image: require('../../assets/images/placeholder.png'), clue: "Can you find the cow?" },
  { id: 3, name: 'dog', image: require('../../assets/images/placeholder.png'), clue: "Where's the dog?" },
  { id: 4, name: 'cat', image: require('../../assets/images/placeholder.png'), clue: "Can you spot the cat?" },
  { id: 5, name: 'bird', image: require('../../assets/images/placeholder.png'), clue: "Where's the bird?" },
  { id: 6, name: 'fish', image: require('../../assets/images/placeholder.png'), clue: "Can you find the fish?" },
  { id: 7, name: 'duck', image: require('../../assets/images/placeholder.png'), clue: "Where's the duck?" },
  { id: 8, name: 'sheep', image: require('../../assets/images/placeholder.png'), clue: "Can you spot the sheep?" },
  { id: 9, name: 'horse', image: require('../../assets/images/placeholder.png'), clue: "Where's the horse?" },
  { id: 10, name: 'rabbit', image: require('../../assets/images/placeholder.png'), clue: "Can you find the rabbit?" },
  { id: 11, name: 'mouse', image: require('../../assets/images/placeholder.png'), clue: "Where's the mouse?" },
  { id: 12, name: 'chicken', image: require('../../assets/images/placeholder.png'), clue: "Can you spot the chicken?" },
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
