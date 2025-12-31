import React from "react";
import { Alert } from "react-native";
import { Button, Text } from "tamagui";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const doSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in"); // change if your route is different
    } catch (e) {
      console.error("signOut failed:", e);
    }
  };

  const handleSignOut = () =>
    Alert.alert(
      "Are you sure you want to sign out?",
      "This will sign you out of your account and you will need to sign in again.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign out", style: "destructive", onPress: doSignOut },
      ]
    );

  return (
    <Button theme="red" borderColor="$borderColor" onPress={handleSignOut}>
      <Text color="white">Sign out</Text>
    </Button>
  );
};
