import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { Bell, User } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { NotificationsSheet } from "./notifications/NotificationsSheet";
import { ProfileSheet } from "./profile/ProfileSheet";
import { notifications } from "./notifications/data";
import { Modal } from "@gluestack-ui/themed";

export default function TopBar() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#fff" : "#000";
  const insets = useSafeAreaInsets();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <Box
        pt={insets.top}
        pb="$2"
        px="$4"
        bg={isDark ? "$backgroundDark900" : "$backgroundLight50"}
        borderBottomWidth={1}
        borderBottomColor={isDark ? "$borderDark900" : "$borderLight100"}
      >
        <HStack justifyContent="space-between" alignItems="center" height={44}>
          <Pressable
            position="relative"
            onPress={() => setShowNotifications(true)}
          >
            <Bell size={24} color={iconColor} />
            {unreadCount > 0 && (
              <Box
                position="absolute"
                top={-4}
                right={-4}
                bg="$primary500"
                borderRadius="$full"
                w={16}
                h={16}
                alignItems="center"
                justifyContent="center"
              >
                <Text color="$white" fontSize={10} fontWeight="$bold">
                  {unreadCount}
                </Text>
              </Box>
            )}
          </Pressable>

          <Text
            fontSize="$lg"
            fontWeight="$bold"
            color={isDark ? "$textLight50" : "$textDark900"}
          >
            Better UK
          </Text>

          <Pressable onPress={() => setShowProfile(true)}>
            <User size={24} color={iconColor} />
          </Pressable>
        </HStack>
      </Box>

      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        avoidKeyboard
        closeOnOverlayClick
      >
        <Modal.Content width="100%" height="90%">
          <NotificationsSheet onClose={() => setShowNotifications(false)} />
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        avoidKeyboard
        closeOnOverlayClick
      >
        <Modal.Content width="100%" height="90%">
          <ProfileSheet onClose={() => setShowProfile(false)} />
        </Modal.Content>
      </Modal>
    </>
  );
}
