
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Animal Learning Game</ThemedText>
      <ThemedView 
        style={styles.button}
        onTouchEnd={() => router.push('/game')}>
        <ThemedText style={styles.buttonText}>Start New Game</ThemedText>
      </ThemedView>
      <ThemedView 
        style={styles.button}
        onTouchEnd={() => router.push('/custom-game')}>
        <ThemedText style={styles.buttonText}>Create Custom Game</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
