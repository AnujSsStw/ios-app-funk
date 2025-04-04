
import { createConfig } from "@gluestack-ui/themed";

const config = createConfig({
  tokens: {
    colors: {
      primary50: '#E9F5FF',
      primary100: '#C2E4FF',
      primary200: '#99D1FF',
      primary300: '#70BDFF',
      primary400: '#47AAFF',
      primary500: '#1F96FF',
      primary600: '#0077E6',
      primary700: '#005BB3',
      primary800: '#004080',
      primary900: '#00254D',
      secondary50: '#FFF5E9',
      secondary100: '#FFE4C2',
      secondary200: '#FFD199',
      secondary300: '#FFBD70',
      secondary400: '#FFAA47',
      secondary500: '#FF961F',
      secondary600: '#E67700',
      background: '#FFFFFF',
      backgroundDark: '#121212',
      text: '#1A1A1A',
      textDark: '#FFFFFF',
      error: '#FF4444',
      success: '#00C851',
    },
    space: {
      4: 16,
      5: 20,
      6: 24,
    },
    radii: {
      sm: 4,
      md: 8,
      lg: 12,
    },
  },
  aliases: {
    bg: {
      value: {
        base: 'background',
        _dark: 'backgroundDark',
      },
    },
    text: {
      value: {
        base: 'text',
        _dark: 'textDark',
      },
    },
    rounded: {
      value: 'lg',
    },
    buttonRadius: {
      value: 'md',
    },
  },
}) as const;

export default config;
