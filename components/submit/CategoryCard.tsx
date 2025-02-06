import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { CategoryCardProps } from "./types";

export const CategoryCard = ({
  category,
  isSelected,
  onPress,
  index,
}: CategoryCardProps) => (
  <Animated.View
    entering={FadeInDown.duration(600).delay(index * 100)}
    layout={Layout}
  >
    <Pressable
      onPress={onPress}
      mb="$4"
      opacity={isSelected ? 1 : 0.7}
      sx={{
        ":active": {
          opacity: 0.8,
        },
      }}
    >
      <LinearGradient
        colors={category.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 24,
          borderWidth: isSelected ? 3 : 0,
          borderColor: "white",
        }}
      >
        <HStack space="md" alignItems="center">
          <Text fontSize={28}>{category.emoji}</Text>
          <VStack space="xs" flex={1}>
            <Text size="lg" color="$white" fontWeight="$bold">
              {category.title}
            </Text>
            <Text size="sm" color="rgba(255, 255, 255, 0.8)">
              {category.description}
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>
    </Pressable>
  </Animated.View>
);
