import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "@expo-google-fonts/lora";
import { fontAssets } from "@/constants/Fonts";
// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_700Bold,
// } from "@expo-google-fonts/inter";

export default function RootLayout() {
  useFrameworkReady();
  const { theme, isDark } = useTheme();

  const [fontsLoaded, fontError] = useFonts(fontAssets);

  // const [fontsLoaded, fontError] = useFonts({
  //   "Inter-Regular": Inter_400Regular,
  //   "Inter-Medium": Inter_500Medium,
  //   "Inter-Bold": Inter_700Bold,
  // });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="meditation/[id]"
          options={{ presentation: "card" }}
        />
        <Stack.Screen name="category/[id]" options={{ headerShown: true }} />
        <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
