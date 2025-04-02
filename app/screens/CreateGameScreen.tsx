
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');
const spacing = 10;
const itemWidth = (width - (spacing * 4)) / 3;

export default function CreateGameScreen() {
  const [theme, setTheme] = useState('');
  const [showThemeInput, setShowThemeInput] = useState(true);
  const [images, setImages] = useState(Array(9).fill(null));
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [recording, setRecording] = useState(null);
  const [audio, setAudio] = useState(Array(9).fill(null));
  const [completedImages, setCompletedImages] = useState([]);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 9,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images];
      result.assets.forEach((asset, index) => {
        newImages[index] = asset.uri;
      });
      setImages(newImages);
      setShowThemeInput(false);
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to record audio');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    
    const newAudio = [...audio];
    newAudio[currentImageIndex] = uri;
    setAudio(newAudio);
  };

  const playRecording = async () => {
    if (!audio[currentImageIndex]) return;
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri: audio[currentImageIndex] });
      await sound.playAsync();
    } catch (err) {
      Alert.alert('Error', 'Failed to play recording');
    }
  };

  const saveImage = () => {
    if (!audio[currentImageIndex]) {
      Alert.alert('Audio needed', 'Please record audio before saving');
      return;
    }
    setCompletedImages([...completedImages, currentImageIndex]);
    setCurrentImageIndex(null);
  };

  const removeAudio = () => {
    const newAudio = [...audio];
    newAudio[currentImageIndex] = null;
    setAudio(newAudio);
  };

  const finishSetup = () => {
    if (completedImages.length !== images.filter(img => img !== null).length) {
      Alert.alert('Incomplete', 'Please record audio for all images');
      return;
    }

    // Save the custom theme
    const customTheme: ImagePackage = {
      theme,
      items: images.filter(img => img !== null).map((img, index) => ({
        name: `Custom ${index + 1}`,
        image: img,
        isCustom: true,
        audio: audio[index]
      }))
    };
    
    imagePackages.push(customTheme);
    router.back();
  };

  if (showThemeInput) {
    return (
      <ThemedView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="What is the theme of your game?"
          value={theme}
          onChangeText={setTheme}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={pickImages}>
          <ThemedText style={styles.buttonText}>Next</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  if (currentImageIndex !== null) {
    return (
      <ThemedView style={styles.container}>
        <Image source={{ uri: images[currentImageIndex] }} style={styles.fullImage} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentImageIndex(null)}>
            <ThemedText style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={recording ? stopRecording : startRecording}>
            <ThemedText style={styles.buttonText}>{recording ? 'Stop' : 'Record'}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={playRecording}>
            <ThemedText style={styles.buttonText}>Play</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <ThemedText style={styles.buttonText}>Save</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={removeAudio}>
            <ThemedText style={styles.buttonText}>Remove</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.grid}>
        {images.map((image, index) => (
          image && (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => setCurrentImageIndex(index)}>
              <Image source={{ uri: image }} style={styles.image} />
              {completedImages.includes(index) && (
                <View style={styles.checkmark}>
                  <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                </View>
              )}
            </TouchableOpacity>
          )
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={finishSetup}>
        <ThemedText style={styles.buttonText}>Finish</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing,
    backgroundColor: '#E91E63',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imageContainer: {
    width: itemWidth,
    height: itemWidth,
    marginBottom: spacing,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  checkmark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 40,
    color: 'white',
  },
});
