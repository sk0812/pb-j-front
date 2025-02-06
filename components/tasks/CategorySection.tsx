import { Box, Text, VStack } from "@gluestack-ui/themed";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Category } from "./types";
import { TaskItem } from "./TaskItem";

interface CategorySectionProps {
  category: Category;
  index: number;
}

export const CategorySection = ({ category, index }: CategorySectionProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(index * 100)}>
      <Box mb="$8">
        <VStack space="xs" mb="$4">
          <Text size="xl" color="$textLight900" fontWeight="$bold">
            {category.title}
          </Text>
          <Text size="sm" color="$textLight500">
            {category.description}
          </Text>
        </VStack>

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
