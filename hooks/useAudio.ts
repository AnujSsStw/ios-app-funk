import { Audio } from 'expo-av';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export function useAudio() {
  const playSound = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/audio/correct.mp3'));
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  const playInstructions = useCallback(async (text: string) => {
    if (Platform.OS === 'web') {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    playCorrectSound: playSound,
    playInstructions
  };
}