import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Check } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  Easing,
  FadeInDown,
  FadeIn,
  SlideInRight,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface Task {
  id: string;
  title: string;
  description: string;
  scientificBenefit: string;
  hasCounter?: boolean;
  counterTarget?: number;
  counterUnit?: string;
}

interface Category {
  title: string;
  description: string;
  color: string;
  tasks: Task[];
}

const categories: Category[] = [
  {
    title: "Self",
    description: "Take care of your personal well-being",
    color: "#16A34A",
    tasks: [
      {
        id: "self-1",
        title: "Meditate",
        description: "10 minutes of mindfulness",
        scientificBenefit:
          "Meditation reduces stress by lowering cortisol levels and increases gray matter in areas of the brain associated with self-awareness, compassion, and introspection.",
        hasCounter: true,
        counterTarget: 10,
        counterUnit: "minutes",
      },
      {
        id: "self-2",
        title: "Read a Book",
        description: "30 minutes of reading",
        scientificBenefit:
          "Reading improves memory, reduces stress by up to 68%, and may lower the risk of Alzheimer's by keeping your brain active and engaged.",
        hasCounter: true,
        counterTarget: 30,
        counterUnit: "minutes",
      },
      {
        id: "self-3",
        title: "Exercise",
        description: "45 minutes of physical activity",
        scientificBenefit:
          "Exercise releases endorphins, increases BDNF protein production which supports neuron growth, and improves cardiovascular health by 30-40%.",
        hasCounter: true,
        counterTarget: 45,
        counterUnit: "minutes",
      },
    ],
  },
  {
    title: "Others",
    description: "Make a positive impact on those around you",
    color: "#0284C7",
    tasks: [
      {
        id: "others-1",
        title: "Random Act of Kindness",
        description: "Do something nice for someone",
        scientificBenefit:
          "Acts of kindness increase oxytocin production, reducing blood pressure and inflammation while boosting positive mood and social connection.",
      },
      {
        id: "others-2",
        title: "Call a Friend",
        description: "Connect with someone you care about",
        scientificBenefit:
          "Social connections increase longevity by 50%, boost immune system function, and reduce anxiety by triggering the release of oxytocin.",
      },
      {
        id: "others-3",
        title: "Share Knowledge",
        description: "Teach something new to others",
        scientificBenefit:
          "Teaching others reinforces your own learning, increases neural connections, and boosts confidence through the protégé effect.",
      },
    ],
  },
  {
    title: "Earth",
    description: "Contribute to environmental well-being",
    color: "#7C3AED",
    tasks: [
      {
        id: "earth-1",
        title: "Reduce Plastic",
        description: "Avoid single-use plastics today",
        scientificBenefit:
          "Reducing plastic use decreases endocrine disruptors in your body and helps preserve marine ecosystems that produce 70% of our oxygen.",
      },
      {
        id: "earth-2",
        title: "Save Energy",
        description: "Turn off unused electronics and lights",
        scientificBenefit:
          "Reducing energy consumption lowers carbon emissions and exposure to electromagnetic fields, which may affect sleep quality and stress levels.",
      },
      {
        id: "earth-3",
        title: "Walk or Cycle",
        description: "Choose eco-friendly transportation",
        scientificBenefit:
          "Active transportation reduces carbon emissions while moderate exercise improves cognitive function by up to 20% through increased blood flow.",
        hasCounter: true,
        counterTarget: 3,
        counterUnit: "km",
      },
    ],
  },
];

interface TaskItemProps {
  task: Task;
  categoryColor: string;
}

const TaskItem = ({ task, categoryColor }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);
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

  const handleFlip = () => {
    const newValue = rotation.value === 0 ? 1 : 0;
    rotation.value = withTiming(newValue, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <Pressable onPress={handleFlip}>
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
            borderColor={categoryColor + "20"}
          >
            <HStack space="md" alignItems="flex-start">
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  setIsCompleted(!isCompleted);
                }}
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
              </Pressable>

              <VStack flex={1} space="xs">
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
                    bg={categoryColor + "10"}
                    p="$4"
                    borderRadius="$xl"
                    mt="$2"
                    borderWidth={1}
                    borderColor={categoryColor + "20"}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text
                        size="sm"
                        color={categoryColor}
                        fontWeight="$medium"
                      >
                        {counterValue} / {task.counterTarget} {task.counterUnit}
                      </Text>
                      <HStack space="sm">
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            setCounterValue(Math.max(0, counterValue - 1));
                          }}
                          bg={categoryColor + "20"}
                          p="$2"
                          borderRadius="$lg"
                        >
                          <Text color={categoryColor} fontSize={16}>
                            -
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation();
                            setCounterValue(
                              Math.min(
                                task.counterTarget || 1,
                                counterValue + 1
                              )
                            );
                          }}
                          bg={categoryColor + "20"}
                          p="$2"
                          borderRadius="$lg"
                        >
                          <Text color={categoryColor} fontSize={16}>
                            +
                          </Text>
                        </Pressable>
                      </HStack>
                    </HStack>
                  </Box>
                )}
              </VStack>
            </HStack>
          </Box>
        </Animated.View>

        <Animated.View
          style={[{ position: "absolute", width: "100%" }, backStyle]}
          onLayout={(e) => setBackHeight(e.nativeEvent.layout.height)}
        >
          <Box bg={categoryColor} borderRadius={24} p="$6">
            <Text color="$white" size="sm" textAlign="center" lineHeight="$lg">
              {task.scientificBenefit}
            </Text>
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

const CategorySection = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(index * 200)}>
      <VStack space="md" mb="$6">
        <Animated.View entering={SlideInRight.duration(600).delay(index * 200)}>
          <LinearGradient
            colors={[category.color, category.color + "CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 24,
            }}
          >
            <VStack space="xs">
              <Text size="xl" color="$white" fontWeight="$bold">
                {category.title}
              </Text>
              <Text size="sm" color="rgba(255, 255, 255, 0.8)">
                {category.description}
              </Text>
            </VStack>
          </LinearGradient>
        </Animated.View>
        <VStack space="md">
          {category.tasks.map((task, taskIndex) => (
            <Animated.View
              key={task.id}
              entering={FadeInDown.duration(600).delay(
                (index * 3 + taskIndex) * 100
              )}
            >
              <TaskItem task={task} categoryColor={category.color} />
            </Animated.View>
          ))}
        </VStack>
      </VStack>
    </Animated.View>
  );
};

export default function TasksScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="$4" flex={1}>
          <Animated.View entering={FadeIn.duration(600)}>
            <VStack space="xl">
              <VStack space="xs">
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    size="2xl"
                    fontWeight="$bold"
                    letterSpacing={-1}
                    color="$textLight900"
                  >
                    Daily Tasks
                  </Text>
                </Box>
                <Text size="lg" color="$textLight500">
                  Make a positive impact today
                </Text>
              </VStack>

              {categories.map((category, index) => (
                <CategorySection
                  key={category.title}
                  category={category}
                  index={index}
                />
              ))}
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
