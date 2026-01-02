import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Alert, Platform } from "react-native";
import { Button, Text } from "tamagui";

export const SignOutButton = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const doSignOut = async () => {
    try {
      await signOut();
      // Groups like (app) are not part of the URL; this is /sign-in
      router.replace("/sign-in");
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  const handleSignOut = async () => {
    // On web, React Native Alert may not support multi-button callbacks reliably.
    if (Platform.OS === "web") {
      const ok =
        typeof window !== "undefined"
          ? window.confirm("Are you sure you want to sign out?")
          : true;
      if (ok) {
        await doSignOut();
      }
      return;
    }

    // Native confirm dialog
    Alert.alert(
      "Are you sure you want to sign out?",
      "This will sign you out of your account and you will need to sign in again.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: doSignOut,
        },
      ]
    );
  };
  return (
    <Button theme="red" borderColor="$borderColor" onPress={handleSignOut}>
      <Text color="white" fontWeight="600">
        Sign out
      </Text>
    </Button>
  );
};
