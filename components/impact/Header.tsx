import { Box, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { HeaderProps } from "./types";

export const Header = ({ onViewStreaks }: HeaderProps) => {
  return (
    <VStack space="xs">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          color="$textLight900"
          size="2xl"
          fontWeight="$bold"
          letterSpacing={-1}
        >
          Your Impact
        </Text>
        <Pressable
          bg="$primary500"
          px="$4"
          py="$2"
          borderRadius="$lg"
          flexDirection="row"
          alignItems="center"
          onPress={onViewStreaks}
          sx={{
            ":active": {
              bg: "$primary600",
            },
          }}
        >
          <Text color="$white" fontWeight="$medium" size="sm">
            View Habit Streaks
          </Text>
        </Pressable>
      </Box>
      <Text color="$textLight500" size="lg">
        Track your contribution across 4 areas
      </Text>
    </VStack>
  );
};
