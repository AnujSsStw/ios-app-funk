
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback, useRef, useEffect } from 'react';
import { Platform } from 'react-native';

export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);

  // Cleanup sound when component unmounts
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = useCallback(async () => {
    try {
      // Unload any existing sound first
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // Configure audio mode first
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      // Create and load the sound
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/correct.mp3'),
        { shouldPlay: false, volume: 1.0 }
      );

      soundRef.current = sound;
      await sound.playAsync();

      // Clean up after playback finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
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
