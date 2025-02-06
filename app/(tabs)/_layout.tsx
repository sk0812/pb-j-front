import { Tabs } from "expo-router";
import {
  Calendar,
  ListTodo,
  TrendingUp,
  Newspaper,
  PlusCircle,
} from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import TopBar from "@/components/TopBar";

const AnimatedIcon = Animated.createAnimatedComponent(Calendar);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#fff" : "#000",
        tabBarInactiveTintColor: isDark ? "#666" : "#999",
        tabBarStyle: {
          backgroundColor: isDark ? "#111" : "#fff",
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        header: () => <TopBar />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(200) : undefined}
              exiting={!focused ? FadeOut.duration(200) : undefined}
            >
              <AnimatedIcon
                size={24}
                color={color}
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(200) : undefined}
              exiting={!focused ? FadeOut.duration(200) : undefined}
            >
              <ListTodo
                size={24}
                color={color}
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="impact"
        options={{
          title: "Impact",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(200) : undefined}
              exiting={!focused ? FadeOut.duration(200) : undefined}
            >
              <TrendingUp
                size={24}
                color={color}
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(200) : undefined}
              exiting={!focused ? FadeOut.duration(200) : undefined}
            >
              <Newspaper
                size={24}
                color={color}
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="submit"
        options={{
          title: "Submit",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(200) : undefined}
              exiting={!focused ? FadeOut.duration(200) : undefined}
            >
              <PlusCircle
                size={24}
                color={color}
                style={{
                  transform: [{ scale: focused ? 1.1 : 1 }],
                }}
              />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}
