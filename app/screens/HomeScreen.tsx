
import React from 'react';
import { StyleSheet, TouchableOpacity, Platform, View, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>TAPPYTALK</ThemedText>
          <ThemedText style={styles.subtitle}>The language-learning game you create.</ThemedText>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push('/screens/ThemeSelectScreen')}>
          <ThemedText style={styles.startButtonText}>START NEW GAME!</ThemedText>
          <View style={styles.arrow}>
            <ThemedText style={styles.arrowText}>›</ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/screens/SelectCreateEditScreen')}>
          <ThemedText style={styles.buttonText}>CREATE YOUR OWN</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => Linking.openURL('mailto:garrett@lauringson.com?subject=Help%20%7C%20Send%20Feedback%20TappyTalk')}>
          <ThemedText style={styles.buttonText}>HELP | SEND FEEDBACK</ThemedText>
          <View style={styles.questionMark}>
            <ThemedText style={styles.questionMarkText}>?</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A0D67',
    padding: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#00BFB3',
    borderRadius: 25,
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  startButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  startButtonText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bottomButtons: {
    gap: 15,
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  createButton: {
    backgroundColor: '#00BFB3',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  helpButton: {
    backgroundColor: '#00BFB3',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionMark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMarkText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
