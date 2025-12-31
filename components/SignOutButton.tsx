import React from "react";
import { Alert } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button, Text } from "tamagui";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const doSignOut = async () => {
    try {
      await signOut();

      // Clear tabs / stacks / modals
      router.dismissAll();

      // Your sign-in screen lives in app/(app)/sign-in.tsx
      router.replace("/(app)/sign-in");
    } catch (err) {
      console.error("Sign out failed:", err);
      Alert.alert("Sign out failed", "Please try again.");
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Are you sure you want to sign out?",
      "This will sign you out of your account and you will need to sign in again.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign out", style: "destructive", onPress: doSignOut },
      ]
    );
  };

  return (
    <Button theme="red" borderColor="$borderColor" onPress={handleSignOut}>
      <Text color="white">Sign out</Text>
    </Button>
  );
};
