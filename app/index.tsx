import { Stack } from "expo-router";
import HomeScreen from "./screens/HomeScreen";
import React, { useCallback, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "expo-image";
import { useFonts } from "expo-font";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded, error] = useFonts({
    Wedge: require("../assets/fonts/Wedges.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        if (loaded) {
          setAppIsReady(true);
        }
      }
    }

    prepare();
  }, [loaded, error]);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layoutV
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onLayout={onLayoutRootView}
      >
        {/* <ThemedText>SplashScreen Demo! 👋</ThemedText>
        <Entypo name="rocket" size={30} color="white" /> */}
        <Image
          source={require("../assets/images/splash_full.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <HomeScreen />
    </View>
  );
}
