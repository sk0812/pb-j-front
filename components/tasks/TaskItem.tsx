import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Check } from "lucide-react-native";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { TaskItemProps } from "./types";

export const TaskItem = ({ task, categoryColor }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const rotation = useSharedValue(0);
  const [frontHeight, setFrontHeight] = useState(0);
  const [backHeight, setBackHeight] = useState(0);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: interpolate(rotation.value, [0, 1], [0, 180]) + "deg",
      },
    ],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
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
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: withTiming(rotation.value === 0 ? frontHeight : backHeight, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const handleFlip = () => {
    const newValue = rotation.value === 0 ? 1 : 0;
    rotation.value = withTiming(newValue, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const renderCheckbox = () => (
    <Pressable
      onPress={() => setIsCompleted(!isCompleted)}
      p="$2"
      hitSlop={20}
      position="absolute"
      left="$4"
      top="$4"
      zIndex={99}
    >
      <Box
        p="$3"
        borderRadius="$xl"
        borderWidth={2}
        borderColor={isCompleted ? categoryColor : categoryColor + "40"}
        bg={isCompleted ? categoryColor : "transparent"}
        alignItems="center"
        justifyContent="center"
        h={32}
        w={32}
      >
        {isCompleted && <Icon as={Check} size="md" color="$white" />}
      </Box>
    </Pressable>
  );

  return (
    <Box>
      <Animated.View style={[containerStyle]}>
        <Animated.View
          style={[{ position: "absolute", width: "100%" }, frontStyle]}
          onLayout={(e) => setFrontHeight(e.nativeEvent.layout.height)}
        >
          <Pressable onPress={handleFlip}>
            <Box
              bg="$white"
              borderRadius={24}
              p="$6"
              pl={70}
              borderWidth={1}
              borderColor={categoryColor + "20"}
            >
              <VStack space="xs">
                <Text
                  size="lg"
                  color={isCompleted ? categoryColor : "$textLight900"}
                  fontWeight="$medium"
                  strikeThrough={isCompleted}
                >
                  {task.title}
                </Text>
                <Text size="sm" color="$textLight500">
                  {task.description}
                </Text>
                <Text size="xs" color="$textLight400" mt="$1">
                  Tap to see scientific benefits
                </Text>

                {task.hasCounter && isCompleted && (
                  <Box
                    mt="$2"
                    bg={categoryColor + "10"}
                    p="$2"
                    borderRadius="$lg"
                  >
                    <Text size="sm" color={categoryColor}>
                      {counterValue} / {task.counterTarget} {task.counterUnit}
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </Pressable>
          {renderCheckbox()}
        </Animated.View>

        <Animated.View
          style={[backStyle]}
          onLayout={(e) => setBackHeight(e.nativeEvent.layout.height)}
        >
          <Pressable onPress={handleFlip}>
            <Box
              bg="$white"
              borderRadius={24}
              p="$6"
              borderWidth={1}
              borderColor={categoryColor + "20"}
            >
              <VStack space="md">
                <Text size="lg" color="$textLight900" fontWeight="$medium">
                  Scientific Benefits
                </Text>
                <Text size="sm" color="$textLight500" lineHeight={20}>
                  {task.scientificBenefit}
                </Text>
              </VStack>
            </Box>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Box>
  );
};
