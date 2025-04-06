
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View, Linking } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.mainTitle}>Find the 🐱</ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/screens/ThemeSelectScreen')}>
          <ThemedText style={styles.buttonText}>Start New Game!</ThemedText>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => router.push('/screens/SelectCreateEditScreen')}>
          <ThemedText style={styles.footerButtonText}>Create your own</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.footerButton, styles.helpButton]}
          onPress={() => Linking.openURL('mailto:garrett@lauringson.com?subject=Help%20%7C%20Send%20Feedback%20TappyTalk')}>
          <ThemedText style={styles.footerButtonText}>Help | Send Feedback</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E91E63',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
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
    padding: 20,
    backgroundColor: '#4A0D2D',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  helpButton: {
    backgroundColor: '#2D0619',
  },
});
