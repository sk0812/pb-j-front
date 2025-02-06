import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { format, subDays, isEqual, startOfDay, addDays } from "date-fns";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { DailyCard } from "./DailyCard";
import { dailyItems } from "./data";
import { useState, useCallback } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react-native";

interface PreviousDaysSheetProps {
  onClose: () => void;
}

export const PreviousDaysSheet = ({ onClose }: PreviousDaysSheetProps) => {
  const insets = useSafeAreaInsets();
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(subDays(today, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = useCallback((event: any, date?: Date) => {
    // Always hide the date picker after selection
    setShowDatePicker(false);
    if (date) {
      setIsLoading(true);
      setSelectedDate(startOfDay(date));
      // Simulate loading state for smoother transitions
      setTimeout(() => setIsLoading(false), 300);
    }
  }, []);

  const navigateDate = useCallback((days: number) => {
    setIsLoading(true);
    setSelectedDate((current) => startOfDay(addDays(current, days)));
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Generate items for the selected date
  const items = dailyItems.map((item) => ({
    ...item,
    frontContent: `${item.frontContent} (${format(selectedDate, "MMM d")})`,
    backContent: `${item.backContent} (${format(selectedDate, "MMM d")})`,
  }));

  const canGoForward = !isEqual(startOfDay(addDays(selectedDate, 1)), today);

  return (
    <Box
      flex={1}
      bg="$backgroundLight50"
      sx={{
        _dark: {
          bg: "$backgroundDark900",
        },
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <Box p="$4">
          <Animated.View entering={FadeIn.duration(400)}>
            <VStack space="xl">
              <VStack space="xs">
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  mb="$4"
                >
                  <Heading
                    size="xl"
                    letterSpacing={-1}
                    sx={{
                      _dark: { color: "$textLight50" },
                    }}
                  >
                    Previous Days
                  </Heading>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={onClose}
                    sx={{
                      _dark: {
                        borderColor: "$borderDark700",
                      },
                    }}
                  >
                    <Button.Text>Close</Button.Text>
                  </Button>
                </HStack>

                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  bg="$primary50"
                  p="$4"
                  borderRadius="$xl"
                  mb="$2"
                  sx={{
                    _dark: {
                      bg: "$primary950",
                    },
                  }}
                >
                  <HStack space="md" alignItems="center">
                    <Calendar
                      size={24}
                      color={Platform.select({
                        ios: "#0284C7",
                        android: "#0284C7",
                        default: "#0284C7",
                      })}
                    />
                    <VStack flex={1}>
                      <Text
                        size="lg"
                        color="$primary600"
                        fontWeight="$bold"
                        sx={{
                          _dark: {
                            color: "$primary300",
                          },
                        }}
                      >
                        {format(selectedDate, "EEEE")}
                      </Text>
                      <Text
                        size="sm"
                        color="$primary500"
                        sx={{
                          _dark: {
                            color: "$primary400",
                          },
                        }}
                      >
                        {format(selectedDate, "MMMM d, yyyy")}
                      </Text>
                    </VStack>
                    <Text size="sm" color="$primary500">
                      Tap to change
                    </Text>
                  </HStack>
                </Pressable>

                <HStack space="sm" justifyContent="center" mb="$4">
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => navigateDate(-1)}
                    sx={{
                      _dark: {
                        borderColor: "$borderDark700",
                      },
                    }}
                  >
                    <ButtonIcon as={ChevronLeft} mr="$1" />
                    <Button.Text>Previous</Button.Text>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => navigateDate(1)}
                    isDisabled={!canGoForward}
                    sx={{
                      _dark: {
                        borderColor: "$borderDark700",
                      },
                    }}
                  >
                    <Button.Text>Next</Button.Text>
                    <ButtonIcon as={ChevronRight} ml="$1" />
                  </Button>
                </HStack>

                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleDateChange}
                    maximumDate={subDays(today, 1)}
                  />
                )}
              </VStack>

              <Animated.View layout={Layout}>
                <VStack space="md">
                  {isLoading ? (
                    <Text size="sm" color="$textLight500" textAlign="center">
                      Loading items...
                    </Text>
                  ) : (
                    items.map((item, index) => (
                      <Animated.View
                        key={index}
                        entering={FadeInDown.duration(400).delay(index * 100)}
                      >
                        <DailyCard {...item} />
                      </Animated.View>
                    ))
                  )}
                </VStack>
              </Animated.View>
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </Box>
  );
};
