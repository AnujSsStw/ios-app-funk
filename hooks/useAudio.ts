
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback, useRef } from 'react';
import { Platform } from 'react-native';

export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/correct.mp3'),
        { shouldPlay: true, volume: 1.0 }
      );
      
      soundRef.current = sound;
      await sound.playAsync();
      
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      console.warn('Sound playback error:', error);
    }
  }, []);

  const playInstructions = useCallback(async (text: string) => {
    try {
      if (Platform.OS === 'web') {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      } else {
        await Speech.speak(text, {
          language: 'en',
          pitch: 1,
          rate: 0.8,
        });
      }
    } catch (error) {
      console.warn('Speech synthesis error:', error);
    }
  }, []);

  return {
    playCorrectSound: playSound,
    playInstructions
  };
}
