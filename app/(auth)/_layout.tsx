import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="signup/step1"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="signup/step2"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="signup/step3"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
