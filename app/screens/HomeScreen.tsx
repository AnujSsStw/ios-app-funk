import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.mainTitle}>Find the 🐱</ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/screens/ThemeSelectScreen')}>
          <ThemedText style={styles.buttonText}>Start New Game!</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => router.push('/screens/CreateGameScreen')}>
        <ThemedText style={styles.footerButtonText}>Create your own</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E91E63',
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 48,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    paddingHorizontal: 10,
    lineHeight: Platform.OS === 'ios' ? 58 : 48,
    includeFontPadding: false,
    textAlignVertical: 'center',
    marginBottom: 40,
  },
  button: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#9C27B0',
    borderWidth: 3,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  footerButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4A0D2D',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});