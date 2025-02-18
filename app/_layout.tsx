import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Stack } from "expo-router";
import { SignupProvider } from "../contexts/SignupContext";

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <SignupProvider>
        <Stack>
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SignupProvider>
    </GluestackUIProvider>
  );
}
