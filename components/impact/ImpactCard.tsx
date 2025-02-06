import { Box, Text } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { View, Dimensions } from "react-native";
import { ImpactCardProps } from "./types";

const { width } = Dimensions.get("window");

export const ImpactCard = ({
  title,
  color,
  yourImpact,
  ourImpact,
  emoji,
}: ImpactCardProps) => {
  return (
    <View style={{ width: width - 32 }}>
      <LinearGradient
        colors={[color, color + "CC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 24,
          marginBottom: 16,
        }}
      >
        <Box flexDirection="row" alignItems="center" mb="$4">
          <Box bg="rgba(255, 255, 255, 0.2)" p="$3" borderRadius="$2xl" mr="$4">
            <Text fontSize={32}>{emoji}</Text>
          </Box>
          <Text color="$white" size="2xl" fontWeight="$bold">
            {title}
          </Text>
        </Box>

        <Box
          flexDirection="row"
          justifyContent="space-between"
          bg="rgba(255, 255, 255, 0.1)"
          p="$4"
          borderRadius="$xl"
        >
          <Box
            flex={1}
            borderRightWidth={1}
            borderRightColor="rgba(255, 255, 255, 0.2)"
            pr="$4"
          >
            <Text color="rgba(255, 255, 255, 0.8)" size="sm" mb="$2">
              Your Impact
            </Text>
            <Text color="$white" size="xl" fontWeight="$bold">
              {yourImpact}
            </Text>
          </Box>
          <Box flex={1} pl="$4">
            <Text color="rgba(255, 255, 255, 0.8)" size="sm" mb="$2">
              Community Impact
            </Text>
            <Text color="$white" size="xl" fontWeight="$bold">
              {ourImpact}
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </View>
  );
};
