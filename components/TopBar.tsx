import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { Bell, User } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopBar() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#fff" : "#000";
  const insets = useSafeAreaInsets();

  return (
    <Box
      pt={insets.top}
      pb="$2"
      px="$4"
      bg={isDark ? "$backgroundDark900" : "$backgroundLight50"}
      borderBottomWidth={1}
      borderBottomColor={isDark ? "$borderDark900" : "$borderLight100"}
    >
      <HStack justifyContent="space-between" alignItems="center" height={44}>
        <Pressable>
          <Bell size={24} color={iconColor} />
        </Pressable>

        <Text
          fontSize="$lg"
          fontWeight="$bold"
          color={isDark ? "$textLight50" : "$textDark900"}
        >
          Better UK
        </Text>

        <Pressable>
          <User size={24} color={iconColor} />
        </Pressable>
      </HStack>
    </Box>
  );
}
