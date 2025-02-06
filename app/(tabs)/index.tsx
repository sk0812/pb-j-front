import {
  Box,
  ScrollView,
  VStack,
  Heading,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { DailyCard } from "@/components/today/DailyCard";
import { dailyItems } from "@/components/today/dailyItems";

export default function TodayScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
      <Animated.View
        entering={FadeInDown.duration(600).delay(1000)}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Box
          p="$4"
          bg="$backgroundLight50"
          borderTopWidth={1}
          borderTopColor="$borderLight200"
          shadowColor="$shadowLight500"
          shadowOffset={{ width: 0, height: -4 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={5}
          sx={{
            _dark: {
              bg: "$backgroundDark900",
              borderTopColor: "$borderDark800",
            },
          }}
        >
          <Pressable
            bg="$primary500"
            py="$3.5"
            borderRadius="$xl"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            shadowColor="$primary500"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
            elevation={5}
            sx={{
              ":active": {
                bg: "$primary600",
                transform: [{ scale: 0.98 }],
              },
            }}
          >
            <Text color="$white" fontWeight="$bold" size="lg">
              View Previous Days
            </Text>
          </Pressable>
        </Box>
      </Animated.View>
    </SafeAreaView>
  );
}
