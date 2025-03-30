
import { Audio } from 'expo-av';
import { useCallback } from 'react';

export const useAudio = () => {
  const playCorrectSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/correct.mp3')
    );
    await sound.playAsync();
  }, []);

  const playInstructions = useCallback(async (animalName: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Where is the ${animalName}?`);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { playCorrectSound, playInstructions };
};
