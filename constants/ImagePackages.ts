export interface ImagePackage {
  theme: string;
  items: Array<{
    name: string;
    image: string;
    isCustom?: boolean;
    audio?: string;
  }>;
}

import AsyncStorage from "@react-native-async-storage/async-storage";

export let imagePackages: ImagePackage[] = [
  {
    theme: "Nature",
    items: [
      { name: "Sunflower", image: "🌻" },
      { name: "Mountain", image: "⛰️" },
      { name: "Forest", image: "🌲" },
      { name: "Cloud", image: "☁️" },
      { name: "Snow Peak", image: "🏔️" },
      { name: "Palm Tree", image: "🌴" },
      { name: "Rainbow", image: "🌈" },
      { name: "Leaf", image: "🍁" },
      { name: "Star", image: "⭐" },
    ],
  },
  {
    theme: "Farm Animals",
    items: [
      { name: "Cow", image: "🐄" },
      { name: "Pig", image: "🐷" },
      { name: "Chicken", image: "🐔" },
      { name: "Horse", image: "🐎" },
      { name: "Sheep", image: "🐑" },
      { name: "Goat", image: "🐐" },
      { name: "Duck", image: "🦆" },
      { name: "Rooster", image: "🐓" },
      { name: "Dog", image: "🐕" },
    ],
  },
  {
    theme: "Food",
    items: [
      { name: "Pizza", image: "🍕" },
      { name: "Burger", image: "🍔" },
      { name: "Ice Cream", image: "🍦" },
      { name: "Sushi", image: "🍣" },
      { name: "Taco", image: "🌮" },
      { name: "Cookie", image: "🍪" },
      { name: "Fruit", image: "🍎" },
      { name: "Cake", image: "🎂" },
      { name: "Donut", image: "🍩" },
    ],
  },
];

export const saveCustomTheme = async (
  theme: ImagePackage,
  isUpdate = false
) => {
  try {
    const existingThemes = await AsyncStorage.getItem("customThemes");
    let customThemes = existingThemes ? JSON.parse(existingThemes) : [];

    if (isUpdate) {
      // Update existing theme
      customThemes = customThemes.map((t: ImagePackage) =>
        t.theme === theme.theme ? theme : t
      );
      imagePackages = imagePackages.map((t) =>
        t.theme === theme.theme ? theme : t
      );
    } else {
      // Add new theme
      customThemes.push(theme);
      imagePackages.push(theme);
    }

    await AsyncStorage.setItem("customThemes", JSON.stringify(customThemes));
  } catch (error) {
    console.error("Error saving custom theme:", error);
  }
};

export const loadCustomThemes = async () => {
  try {
    const existingThemes = await AsyncStorage.getItem("customThemes");
    if (existingThemes) {
      const customThemes = JSON.parse(existingThemes);
      // Remove any existing custom themes before adding new ones
      imagePackages = imagePackages.slice(0, 3); // Keep only the default themes
      imagePackages.push(...customThemes);
    }
  } catch (error) {
    console.error("Error loading custom themes:", error);
  }
};
