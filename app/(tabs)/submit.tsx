import { Box, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { SafeArea } from "../../components/layout/SafeArea";
import { SubmitForm } from "../../components/submit/SubmitForm";
import { Category } from "../../components/submit/types";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SubmitScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

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
                  Submit Content
                </Text>
                <Text size="lg" color="$textLight500">
                  Share your inspiration with others
                </Text>
              </VStack>

              <SubmitForm
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeArea>
  );
}
