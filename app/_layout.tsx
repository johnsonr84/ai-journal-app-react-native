import { ModalProvider } from "@/contexts/ModalContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/polyfills";
import { tamaguiConfig } from "@/tamagui.config";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortalProvider, TamaguiProvider } from "tamagui";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const publishableKey =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
    Constants.expoConfig?.extra?.clerkPublishableKey;

  if (!publishableKey) {
    throw new Error(
      "Missing Clerk publishable key. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY (e.g. in your deployment environment variables)."
    );
  }

  if (typeof publishableKey !== "string" || !publishableKey.startsWith("pk_")) {
    throw new Error(
      "Invalid Clerk publishable key. EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY must start with 'pk_'."
    );
  }

  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <TamaguiProvider config={tamaguiConfig}>
          <PortalProvider shouldAddRootHost>
            <ModalProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Slot />
              </ThemeProvider>
            </ModalProvider>
          </PortalProvider>
        </TamaguiProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}
