import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { DailyCardProps } from "./types";
import { gradients } from "./types";

export const DailyCard = ({
  title,
  emoji,
  frontContent,
  backContent,
  spotifyLink,
}: DailyCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);
  const [frontHeight, setFrontHeight] = useState(0);
  const [backHeight, setBackHeight] = useState(0);

  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: interpolate(rotation.value, [0, 1], [0, 180]) + "deg",
        },
      ],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: interpolate(rotation.value, [0, 1], [180, 360]) + "deg",
        },
      ],
      backfaceVisibility: "hidden",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(rotation.value === 0 ? frontHeight : backHeight, {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const handlePress = () => {
    const newValue = isFlipped ? 0 : 1;
    rotation.value = withTiming(newValue, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
    setIsFlipped(!isFlipped);
  };

  const getGradient = () => {
    return gradients[title] || ["#16A34A", "#16A34ACC"];
  };

  return (
    <Pressable onPress={handlePress} mb="$4">
      <Animated.View style={[containerStyle]}>
        <Animated.View
          style={[{ position: "absolute", width: "100%" }, frontStyle]}
          onLayout={(e) => setFrontHeight(e.nativeEvent.layout.height)}
        >
          <Box
            bg="$white"
            borderRadius={24}
            p="$6"
            borderWidth={1}
            borderColor={getGradient()[0] + "20"}
          >
            <VStack space="md">
              <HStack space="md" alignItems="center">
                <Box
                  bg={getGradient()[0] + "10"}
                  p="$3"
                  borderRadius="$xl"
                  borderWidth={1}
                  borderColor={getGradient()[0] + "20"}
                >
                  <Text fontSize={28}>{emoji}</Text>
                </Box>
                <VStack space="xs">
                  <Text size="lg" color={getGradient()[0]} fontWeight="$medium">
                    {title}
                  </Text>
                  <Text size="sm" color="$textLight500">
                    Tap to flip
                  </Text>
                </VStack>
              </HStack>
              <Text size="md" color="$textLight900">
                {frontContent}
              </Text>
            </VStack>
          </Box>
        </Animated.View>

        <Animated.View
          style={[{ position: "absolute", width: "100%" }, backStyle]}
          onLayout={(e) => setBackHeight(e.nativeEvent.layout.height)}
        >
          <Box bg={getGradient()[0]} borderRadius={24} p="$6">
            <Text color="$white" size="sm" textAlign="center" lineHeight="$lg">
              {backContent}
            </Text>
            {spotifyLink && (
              <Pressable
                bg="rgba(255, 255, 255, 0.2)"
                py="$2.5"
                borderRadius="$xl"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                mt="$4"
                sx={{
                  ":active": {
                    bg: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <Text color="$white" fontWeight="$bold" size="sm">
                  Listen on Spotify
                </Text>
              </Pressable>
            )}
            <Text
              color="rgba(255, 255, 255, 0.6)"
              size="xs"
              textAlign="center"
              mt="$4"
            >
              Tap to flip back
            </Text>
          </Box>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};
