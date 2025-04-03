
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImagePackage, imagePackages } from '@/constants/ImagePackages';

export default function ThemeSelectScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Pick your theme</ThemedText>
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
        <TouchableOpacity 
          style={[styles.button, styles.createButton]}
          onPress={() => router.push('/screens/CreateGameScreen')}>
          <ThemedText style={styles.buttonText}>Create your own</ThemedText>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
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
  createButton: {
    backgroundColor: '#9C27B0',
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
