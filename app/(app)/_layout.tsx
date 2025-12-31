import React from "react";
import { View } from "react-native";
import { Spinner } from "tamagui";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </View>
    );
  }

  return (
    <>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="new-entry" />
          <Stack.Screen name="edit-entry/[id]" />
          <Stack.Screen name="entry/[id]" />
          <Stack.Screen name="alert-modal" options={{ presentation: "modal" }} />
        </Stack>
      </SignedIn>

      <SignedOut>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
        </Stack>

        {/* Hard redirect if they end up anywhere else */}
        <Redirect href="/(app)/sign-in" />
      </SignedOut>
    </>
  );
}
