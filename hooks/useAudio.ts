
import { Audio } from 'expo-av';
import { useCallback } from 'react';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

export const useAudio = () => {
  const playCorrectSound = useCallback(async () => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(require('../assets/audio/correct.mp3'));
      await soundObject.playAsync();
      // Unload sound when done
      soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await soundObject.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, []);

  const playInstructions = useCallback(async (animalName: string) => {
    try {
      if (Platform.OS === 'web' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Where is the ${animalName}?`);
        window.speechSynthesis.speak(utterance);
      } else {
        await Speech.speak(`Where is the ${animalName}?`, {
          language: 'en',
          pitch: 1,
          rate: 0.9,
        });
      }
    } catch (error) {
      console.error("Error playing instructions:", error);
    }
  }, []);

  return { playCorrectSound, playInstructions };
};
