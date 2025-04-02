
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { imagePackages } from '@/constants/ImagePackages';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Select a Theme</ThemedText>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {imagePackages.map((pack, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.button}
            onPress={() => router.push({
              pathname: '/screens/GameScreen',
              params: { packageIndex: index }
            })}>
            <ThemedText style={styles.buttonText}>{pack.theme}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '40%',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    width: '80%',
    padding: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
