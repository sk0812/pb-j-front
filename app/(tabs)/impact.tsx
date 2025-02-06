import React from "react";
import { Box, ScrollView, Text, Pressable } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { VStack } from "@gluestack-ui/themed";

const { width, height } = Dimensions.get("window");

interface ImpactCardProps {
  title: string;
  color: string;
  yourImpact: string;
  ourImpact: string;
  emoji: string;
}

const ImpactCard = ({
  title,
  color,
  yourImpact,
  ourImpact,
  emoji,
}: ImpactCardProps) => {
  return (
    <View style={{ width: width - 32 }}>
      <LinearGradient
        colors={[color, color + "CC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <Box flexDirection="row" alignItems="center" mb="$4">
          <Box bg="rgba(255, 255, 255, 0.2)" p="$3" borderRadius="$2xl" mr="$4">
            <Text fontSize={32}>{emoji}</Text>
          </Box>
          <Text color="$white" size="2xl" fontWeight="$bold">
            {title}
          </Text>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          bg="rgba(255, 255, 255, 0.1)"
          p="$4"
          borderRadius="$xl"
        >
          <Box
            flex={1}
            borderRightWidth={1}
            borderRightColor="rgba(255, 255, 255, 0.2)"
            pr="$4"
          >
            <Text color="rgba(255, 255, 255, 0.8)" size="sm" mb="$2">
              Your Impact
            </Text>
            <Text color="$white" size="xl" fontWeight="$bold">
              {yourImpact}
            </Text>
          </Box>
          <Box flex={1} pl="$4">
            <Text color="rgba(255, 255, 255, 0.8)" size="sm" mb="$2">
              Community Impact
            </Text>
            <Text color="$white" size="xl" fontWeight="$bold">
              {ourImpact}
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </View>
  );
};

const Header = () => {
  return (
    <VStack space="xs">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          color="$textLight900"
          size="2xl"
          fontWeight="$bold"
          letterSpacing={-1}
        >
          Your Impact
        </Text>
        <Pressable
          bg="$primary500"
          px="$4"
          py="$2"
          borderRadius="$lg"
          flexDirection="row"
          alignItems="center"
          sx={{
            ":active": {
              bg: "$primary600",
            },
          }}
        >
          <Text color="$white" fontWeight="$medium" size="sm">
            View Habit Streaks
          </Text>
        </Pressable>
      </Box>
      <Text color="$textLight500" size="lg">
        Track your contribution across 4 areas
      </Text>
    </VStack>
  );
};

export default function ImpactScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="$4" flex={1}>
          <VStack space="xl">
            <Header />
            <ImpactCard
              title="Emissions"
              color="#16A34A"
              emoji="🌱"
              yourImpact="2.5 tons"
              ourImpact="1,250 tons"
            />
            <ImpactCard
              title="Plastic"
              color="#0284C7"
              emoji="🌊"
              yourImpact="45 kg"
              ourImpact="22,500 kg"
            />
            <ImpactCard
              title="Positivity"
              color="#D97706"
              emoji="😊"
              yourImpact="128"
              ourImpact="64,000"
            />
            <ImpactCard
              title="Waste"
              color="#7C3AED"
              emoji="♻️"
              yourImpact="120 kg"
              ourImpact="60,000 kg"
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
