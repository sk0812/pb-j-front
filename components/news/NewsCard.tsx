import { Box, Image, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  FadeInDown,
  Layout,
} from "react-native-reanimated";
import { NewsCardProps } from "./types";

export const NewsCard = ({ article, index }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(200);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    };
  });

  const handlePress = () => {
    height.value = isExpanded ? 200 : 400;
    setIsExpanded(!isExpanded);
  };

  return (
    <Animated.View
      entering={
        index !== undefined
          ? FadeInDown.duration(600).delay(index * 200)
          : undefined
      }
    >
      <Pressable onPress={handlePress}>
        <Animated.View style={[animatedStyle]} layout={Layout}>
          <Box
            overflow="hidden"
            borderRadius={24}
            bg="$white"
            mb="$4"
            style={{
              height: "100%",
            }}
          >
            <Image
              source={{ uri: article.imageUrl }}
              alt={article.title}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Box
              bg="rgba(0, 0, 0, 0.5)"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
            <Box
              p="$6"
              style={{
                height: "100%",
              }}
            >
              <VStack space="xs" flex={1}>
                <Box
                  bg="$white"
                  px="$2"
                  py="$1"
                  borderRadius="$lg"
                  alignSelf="flex-start"
                  opacity={0.9}
                >
                  <Text size="xs" color="$textLight900">
                    {article.category} • {article.date}
                  </Text>
                </Box>
                <Text
                  size="xl"
                  color="$white"
                  fontWeight="$bold"
                  numberOfLines={isExpanded ? undefined : 2}
                >
                  {article.title}
                </Text>
                <Text
                  size="sm"
                  color="$white"
                  numberOfLines={isExpanded ? undefined : 2}
                  opacity={0.9}
                >
                  {isExpanded ? article.fullContent : article.summary}
                </Text>
                <Text size="xs" color="$white" mt="auto" opacity={0.8}>
                  {isExpanded ? "Tap to collapse" : "Tap to read more"}
                </Text>
              </VStack>
            </Box>
          </Box>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};
