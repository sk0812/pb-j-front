import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "./types";
import Animated, { FadeInDown } from "react-native-reanimated";

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onPress?: (notification: Notification) => void;
}

export const NotificationCard = ({
  notification,
  index,
  onPress,
}: NotificationCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
  });

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 100)}>
      <Pressable
        onPress={() => onPress?.(notification)}
        mb="$4"
        opacity={notification.isRead ? 0.7 : 1}
      >
        <Box
          bg="$white"
          borderRadius={24}
          p="$4"
          borderWidth={1}
          borderColor={notification.color + "20"}
          sx={{
            _dark: {
              bg: "$backgroundDark800",
            },
          }}
        >
          <HStack space="md" alignItems="flex-start">
            <Box
              bg={notification.color + "10"}
              p="$3"
              borderRadius="$xl"
              borderWidth={1}
              borderColor={notification.color + "20"}
            >
              <Text fontSize={24}>{notification.emoji}</Text>
            </Box>

            <VStack flex={1} space="xs">
              <HStack justifyContent="space-between" alignItems="flex-start">
                <Text
                  flex={1}
                  size="lg"
                  color={notification.color}
                  fontWeight="$medium"
                  mr="$2"
                >
                  {notification.title}
                </Text>
                <Text size="xs" color="$textLight400">
                  {timeAgo}
                </Text>
              </HStack>

              <Text
                size="sm"
                color="$textLight700"
                sx={{
                  _dark: {
                    color: "$textLight200",
                  },
                }}
              >
                {notification.message}
              </Text>

              {!notification.isRead && (
                <Box
                  position="absolute"
                  top={2}
                  right={-2}
                  w={8}
                  h={8}
                  borderRadius="$full"
                  bg={notification.color}
                />
              )}
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    </Animated.View>
  );
};
