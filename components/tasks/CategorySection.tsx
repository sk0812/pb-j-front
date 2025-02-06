import { Box, Text, VStack } from "@gluestack-ui/themed";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Category } from "./types";
import { TaskItem } from "./TaskItem";
import { LinearGradient } from "expo-linear-gradient";

interface CategorySectionProps {
  category: Category;
  index: number;
}

export const CategorySection = ({ category, index }: CategorySectionProps) => {
  // Function to get gradient colors as a tuple
  const getGradientColors = (baseColor: string): [string, string] => [
    baseColor,
    `${baseColor}CC`,
  ];

  return (
    <Animated.View entering={FadeInDown.duration(600).delay(index * 100)}>
      <Box mb="$8">
        <LinearGradient
          colors={getGradientColors(category.color)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            padding: 24,
            marginBottom: 16,
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

        <VStack space="md">
          {category.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              categoryColor={category.color}
            />
          ))}
        </VStack>
      </Box>
    </Animated.View>
  );
};
