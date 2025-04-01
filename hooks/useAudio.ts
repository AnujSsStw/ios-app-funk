
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export function useAudio() {
  const playSound = useCallback(async () => {
    let sound;
    try {
      const soundObject = await Audio.Sound.createAsync(
        require('../assets/audio/correct.mp3'),
        { shouldPlay: true }
      );
      sound = soundObject.sound;
      await sound.setVolumeAsync(1.0);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.warn('Sound playback error:', error);
    } finally {
      if (sound) {
        await sound.unloadAsync();
      }
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
