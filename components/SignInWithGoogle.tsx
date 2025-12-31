import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { Button } from "tamagui";

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

// Preloads the browser for Android devices to reduce authentication load time
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function SignInWithGoogle() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      // ✅ Use an explicit native redirect that matches your app scheme
      // Make sure your app scheme is "innerloop" in app.json/app.config.ts
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "innerloop",
        path: "oauth-callback",
      });

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl,
      });

      if (createdSessionId) {
        // ✅ Ensure we actually activate the session
        await setActive?.({ session: createdSessionId });
      }
    } catch (err) {
      console.error("Google SSO error:", err);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <Button
      variant="outlined"
      borderColor="#904BFF"
      borderWidth={1}
      color="#904BFF"
      onPress={onPress}
    >
      Sign in with Google
    </Button>
  );
}
