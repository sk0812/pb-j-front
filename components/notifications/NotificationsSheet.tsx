import {
  Box,
  Button,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationCard } from "./NotificationCard";
import { notifications } from "./data";
import { Notification } from "./types";
import Animated, { FadeIn } from "react-native-reanimated";

interface NotificationsSheetProps {
  onClose: () => void;
}

export const NotificationsSheet = ({ onClose }: NotificationsSheetProps) => {
  const insets = useSafeAreaInsets();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationPress = (notification: Notification) => {
    // Handle notification press
    console.log("Notification pressed:", notification);
  };

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
                  mb="$2"
                >
                  <Heading
                    size="xl"
                    letterSpacing={-1}
                    sx={{
                      _dark: { color: "$textLight50" },
                    }}
                  >
                    Notifications
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

                {unreadCount > 0 && (
                  <Text size="sm" color="$textLight500">
                    You have {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </Text>
                )}
              </VStack>

              <VStack>
                {notifications.map((notification, index) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    index={index}
                    onPress={handleNotificationPress}
                  />
                ))}
              </VStack>
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </Box>
  );
};
