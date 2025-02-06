import { Box } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

interface SafeAreaProps {
  children: ReactNode;
  edges?: Array<"top" | "right" | "bottom" | "left">;
}

export const SafeArea = ({ children, edges = ["bottom"] }: SafeAreaProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      <Box flex={1}>{children}</Box>
    </SafeAreaView>
  );
};
