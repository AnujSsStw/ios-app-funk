
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CustomGameScreen() {
  const [customItems, setCustomItems] = useState([]);
  const [recording, setRecording] = useState();

  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newItems = [...customItems];
      newItems[index] = {
        ...newItems[index],
        image: result.assets[0].uri,
      };
      setCustomItems(newItems);
    }
  };

  const startRecording = async (index) => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async (index) => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(undefined);

    const newItems = [...customItems];
    newItems[index] = {
      ...newItems[index],
      audio: uri,
    };
    setCustomItems(newItems);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Create Custom Game</ThemedText>
      <View style={styles.grid}>
        {Array(12).fill(null).map((_, index) => (
          <View key={index} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage(index)}>
              {customItems[index]?.image ? (
                <Image source={{ uri: customItems[index].image }} style={styles.image} />
              ) : (
                <ThemedText>Pick Image</ThemedText>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.recordButton, recording && styles.recording]}
              onPressIn={() => startRecording(index)}
              onPressOut={() => stopRecording(index)}>
              <ThemedText style={styles.recordButtonText}>
                {customItems[index]?.audio ? '✓' : '🎤'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  recordButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 30,
    height: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#f44336',
  },
  recordButtonText: {
    color: 'white',
  },
});
