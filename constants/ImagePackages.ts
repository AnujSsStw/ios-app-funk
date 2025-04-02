
export interface ImagePackage {
  theme: string;
  items: Array<{
    name: string;
    image: string;
    isCustom?: boolean;
    audio?: string;
  }>;
}

import AsyncStorage from '@react-native-async-storage/async-storage';

export let imagePackages: ImagePackage[] = [
  {
    theme: "Nature",
    items: [
      { name: 'Sunflower', image: '🌻' },
      { name: 'Mountain', image: '⛰️' },
      { name: 'Forest', image: '🌲' },
      { name: 'Cloud', image: '☁️' },
      { name: 'Snow Peak', image: '🏔️' },
      { name: 'Palm Tree', image: '🌴' },
      { name: 'Rainbow', image: '🌈' },
      { name: 'Leaf', image: '🍁' },
      { name: 'Star', image: '⭐' }
    ]
  },
  {
    theme: "Farm Animals",
    items: [
      { name: 'Cow', image: '🐄' },
      { name: 'Pig', image: '🐷' },
      { name: 'Chicken', image: '🐔' },
      { name: 'Horse', image: '🐎' },
      { name: 'Sheep', image: '🐑' },
      { name: 'Goat', image: '🐐' },
      { name: 'Duck', image: '🦆' },
      { name: 'Rooster', image: '🐓' },
      { name: 'Dog', image: '🐕' }
    ]
  },
  {
    theme: "Food",
    items: [
      { name: 'Pizza', image: '🍕' },
      { name: 'Burger', image: '🍔' },
      { name: 'Ice Cream', image: '🍦' },
      { name: 'Sushi', image: '🍣' },
      { name: 'Taco', image: '🌮' },
      { name: 'Cookie', image: '🍪' },


export const saveCustomTheme = async (theme: ImagePackage) => {
  try {
    const existingThemes = await AsyncStorage.getItem('customThemes');
    const customThemes = existingThemes ? JSON.parse(existingThemes) : [];
    customThemes.push(theme);
    await AsyncStorage.setItem('customThemes', JSON.stringify(customThemes));
    imagePackages.push(theme);
  } catch (error) {
    console.error('Error saving custom theme:', error);
  }
};

export const loadCustomThemes = async () => {
  try {
    const existingThemes = await AsyncStorage.getItem('customThemes');
    if (existingThemes) {
      const customThemes = JSON.parse(existingThemes);
      imagePackages.push(...customThemes);
    }
  } catch (error) {
    console.error('Error loading custom themes:', error);
  }
};

      { name: 'Fruit', image: '🍎' },
      { name: 'Cake', image: '🎂' },
      { name: 'Donut', image: '🍩' }
    ]
  }
];
