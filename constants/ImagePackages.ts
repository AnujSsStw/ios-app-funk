
export interface ImagePackage {
  theme: string;
  items: Array<{
    name: string;
    image: string;
  }>;
}

export const imagePackages: ImagePackage[] = [
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
      { name: 'Fruit', image: '🍎' },
      { name: 'Cake', image: '🎂' },
      { name: 'Donut', image: '🍩' }
    ]
  }
];
