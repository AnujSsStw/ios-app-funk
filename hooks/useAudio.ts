
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export function useAudio() {
  const playSound = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/audio/correct.mp3'));
      await sound.playAsync();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for sound to finish
      await sound.unloadAsync(); // Properly cleanup the sound
    } catch (error) {
      console.warn('Sound playback error:', error);
    }
  }, []);

  const playInstructions = useCallback(async (text: string) => {
    if (Platform.OS === 'web') {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      await Speech.speak(text);
    }
  }, []);

  return {
    playCorrectSound: playSound,
    playInstructions
  };
}
