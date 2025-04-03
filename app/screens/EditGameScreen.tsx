
import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { imagePackages } from '@/constants/ImagePackages';

export default function EditGameScreen() {
  const customThemes = imagePackages.filter(pack => pack.items.some(item => item.isCustom));

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Select theme to edit</ThemedText>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {customThemes.map((pack, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.button}
            onPress={() => router.push({
              pathname: '/screens/CreateGameScreen',
              params: { editTheme: pack.theme }
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
    backgroundColor: '#9C27B0',
    borderWidth: 3,
    borderColor: 'black',
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
