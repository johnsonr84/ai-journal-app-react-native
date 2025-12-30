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

const clerkPublishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  (Constants.expoConfig?.extra as any)?.clerkPublishableKey ??
  (Constants.manifest as any)?.extra?.clerkPublishableKey;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing Clerk publishable key. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in EAS env vars (preview) and map it into app.config.ts extra.clerkPublishableKey."
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={clerkPublishableKey}>
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
