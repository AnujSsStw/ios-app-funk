import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImagePackage, loadCustomThemes, imagePackages } from '@/constants/ImagePackages';

export default function SelectCreateEditScreen() {
  const [customThemes, setCustomThemes] = useState<ImagePackage[]>([]);

  useEffect(() => {
    const loadThemes = async () => {
      await loadCustomThemes();
      const themes = imagePackages.filter(pack => pack.items.some(item => item.isCustom));
      setCustomThemes(themes);
    };
    loadThemes();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <TouchableOpacity 
          style={[styles.button, styles.createButton]}
          onPress={() => router.push('/screens/CreateGameScreen')}>
          <ThemedText style={styles.buttonText}>New game</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.sectionTitle}>Edit</ThemedText>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {customThemes.length > 0 ? (
            customThemes.map((theme, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.button, styles.editButton]}
                onPress={() => router.push({
                  pathname: '/screens/CreateGameScreen',
                  params: { editTheme: theme.theme }
                })}>
                <ThemedText style={styles.buttonText}>{theme.theme}</ThemedText>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText style={styles.noThemesText}>Create a new game first.</ThemedText>
          )}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E91E63',
    paddingTop: 40, // Added top padding for safety
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
    alignSelf: 'center',
  },
  createButton: {
    backgroundColor: '#9C27B0',
  },
  editButton: {
    backgroundColor: '#4A0D2D',
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 5,
    lineHeight: 32,
  },
  sectionTitle: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20, // Added padding top to prevent cutoff

  },
  noThemesText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});