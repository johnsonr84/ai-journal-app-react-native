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
  // modern (SDK 49+)
  // Try to safely access clerkPublishableKey from expoConfig.extra or manifest.extra
  (
    (Constants.expoConfig && typeof Constants.expoConfig.extra === "object"
      ? (Constants.expoConfig.extra as any)?.clerkPublishableKey
      : undefined
    ) ??
    (Constants.manifest && typeof (Constants.manifest as any).extra === "object"
      ? (Constants.manifest as any).extra?.clerkPublishableKey
      : undefined
    )
  );

if (!clerkPublishableKey) {
  // Fail fast with a clear message instead of a silent "tap icon does nothing"
  throw new Error(
    "Missing Clerk publishable key. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in EAS env vars and map it into app.config.ts extra.clerkPublishableKey."
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={clerkPublishableKey}
      >
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
