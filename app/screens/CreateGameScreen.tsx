import React, { useState, useEffect } from 'react';
import { ImagePackage, saveCustomTheme, imagePackages, loadCustomThemes } from '@/constants/ImagePackages';
import { StyleSheet, View, TouchableOpacity, TextInput, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');
const spacing = 10;
const itemWidth = (width - (spacing * 4)) / 3;

export default function CreateGameScreen() {
  const { editTheme } = useLocalSearchParams();
  const [theme, setTheme] = useState('');
  const [showThemeInput, setShowThemeInput] = useState(!editTheme);
  const [images, setImages] = useState(Array(9).fill(null));
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [recording, setRecording] = useState(null);
  const [audio, setAudio] = useState(Array(9).fill(null));
  const [completedImages, setCompletedImages] = useState([]);

  useEffect(() => {
    const loadExistingTheme = async () => {
      if (editTheme) {
        await loadCustomThemes();
        const themeData = imagePackages.find(pack => pack.theme === editTheme);
        if (themeData) {
          setTheme(themeData.theme);
          const newImages = Array(9).fill(null);
          const newAudio = Array(9).fill(null);
          const completed = [];

          themeData.items.forEach((item, index) => {
            if (item.image) {
              newImages[index] = item.image;
              newAudio[index] = item.audio;
              completed.push(index);
            }
          });

          setImages(newImages);
          setAudio(newAudio);
          setCompletedImages(completed);
        }
      }
    };
    loadExistingTheme();
  }, [editTheme]);

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

  const finishSetup = async () => {
    if (completedImages.length !== images.filter(img => img !== null).length) {
      Alert.alert('Incomplete', 'Please record audio for all images');
      return;
    }

    // Save or update the custom theme
    const customTheme: ImagePackage = {
      theme: editTheme || theme,
      items: images.filter(img => img !== null).map((img, index) => ({
        name: `Custom ${index + 1}`,
        image: img,
        isCustom: true,
        audio: audio[index]
      }))
    };

    await saveCustomTheme(customTheme, editTheme ? true : false);
    router.back();
  };

  if (showThemeInput) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.titleText}>Name your game</ThemedText>
        <TextInput
          style={styles.input}
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
          <TouchableOpacity style={styles.button} onPress={() => {
            const newImages = [...images];
            newImages[currentImageIndex] = null;
            const newAudio = [...audio];
            newAudio[currentImageIndex] = null;
            setImages(newImages);
            setAudio(newAudio);
            setCompletedImages(completedImages.filter(i => i !== currentImageIndex));
            setCurrentImageIndex(null);
          }}>
            <ThemedText style={styles.buttonText}>Remove Image</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.grid}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.imageContainer, !image && styles.emptySlot]}
            onPress={() => image && setCurrentImageIndex(index)}>
            {image ? (
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
          ) : (
              <ThemedText style={styles.emptySlotText}>Empty Slot</ThemedText>
            )}
          </TouchableOpacity>
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
    justifyContent: 'center', 
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 18,
    width: '80%',
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    flex: 1,
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
    width: '80%',
    alignSelf: 'center',
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
  emptySlot: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySlotText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white'
  }
});