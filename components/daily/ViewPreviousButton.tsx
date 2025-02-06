import { Box, Pressable, Text } from "@gluestack-ui/themed";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ViewPreviousButtonProps {
  onPress?: () => void;
}

export const ViewPreviousButton = ({ onPress }: ViewPreviousButtonProps) => {
  return (
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
          onPress={onPress}
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
  );
};
