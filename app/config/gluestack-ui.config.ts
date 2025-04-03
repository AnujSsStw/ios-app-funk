
import { createConfig } from "@gluestack-ui/themed"

const config = createConfig({
  light: {
    colors: {
      primary: '#000000',
      background: '#FFFFFF',
    },
  },
  dark: {
    colors: {
      primary: '#FFFFFF', 
      background: '#000000',
    },
  },
})

export default config;
