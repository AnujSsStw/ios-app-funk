
import { createConfig } from "@gluestack-ui/themed";

const config = createConfig({
  tokens: {
    colors: {
      primary0: "#ffffff",
      primary400: "#c084fc",
      primary500: "#a855f7",
      primary600: "#9333ea",
    },
  },
  aliases: {
    bg: {
      value: {
        base: "primary0",
      },
    },
    text: {
      value: {
        primary: "primary600",
      },
    },
  },
}) as const;

export default config;
