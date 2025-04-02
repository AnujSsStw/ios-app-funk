
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { imagePackages } from '@/constants/ImagePackages';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.mainTitle}>Find the 🐱</ThemedText>
      <ThemedText style={styles.subtitle}>Pick your game.</ThemedText>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {imagePackages.map((pack, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.button, index === 1 ? styles.yellowButton : index === 0 ? styles.blueButton : styles.greenButton]}
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
    backgroundColor: '#E91E63',
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
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
  },
  subtitle: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
    marginBottom: 30,
    lineHeight: Platform.OS === 'ios' ? 38 : 32,
    includeFontPadding: false,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
  blueButton: {
    backgroundColor: '#00BCD4',
  },
  yellowButton: {
    backgroundColor: '#FFEB3B',
  },
  greenButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 5,
    lineHeight: 32,
  },
});
