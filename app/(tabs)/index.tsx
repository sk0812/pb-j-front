import { Box, Heading, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { SafeArea } from "../../components/layout/SafeArea";
import { DailyCard } from "../../components/daily/DailyCard";
import { ViewPreviousButton } from "../../components/daily/ViewPreviousButton";
import { dailyItems } from "../../components/daily/data";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function TodayScreen() {
  const handleViewPrevious = () => {
    // Handle viewing previous days
    console.log("View previous days");
  };

  return (
    <SafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Box px="$4" pt="$2" pb="$6" flex={1}>
          <Animated.View entering={FadeIn.duration(600)}>
            <VStack space="xl">
              <VStack space="xs">
                <Heading
                  size="2xl"
                  letterSpacing={-1}
                  sx={{
                    _dark: { color: "$textLight50" },
                  }}
                >
                  Things of the Day
                </Heading>
                <Text
                  size="lg"
                  color="$textLight500"
                  sx={{
                    _dark: { color: "$textLight400" },
                  }}
                >
                  Your daily dose of inspiration
                </Text>
              </VStack>

              <VStack>
                {dailyItems.map((item, index) => (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.duration(600).delay(index * 100)}
                  >
                    <DailyCard {...item} />
                  </Animated.View>
                ))}
              </VStack>
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
      <ViewPreviousButton onPress={handleViewPrevious} />
    </SafeArea>
  );
}
