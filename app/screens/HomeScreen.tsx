import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/game')}>
        <ThemedText style={styles.buttonText}>Start Game</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});