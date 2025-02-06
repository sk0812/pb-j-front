import { Box, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { SafeArea } from "../../components/layout/SafeArea";
import { CategorySection } from "../../components/tasks/CategorySection";
import Animated, { FadeIn } from "react-native-reanimated";
import { categories } from "../../components/tasks/data";

export default function TasksScreen() {
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="$4" flex={1}>
          <Animated.View entering={FadeIn.duration(600)}>
            <VStack space="xl">
              <VStack space="xs">
                <Text
                  size="2xl"
                  fontWeight="$bold"
                  letterSpacing={-1}
                  color="$textLight900"
                >
                  Daily Tasks
                </Text>
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
    </SafeArea>
  );
}
