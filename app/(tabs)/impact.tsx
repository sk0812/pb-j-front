import { Box, ScrollView, VStack } from "@gluestack-ui/themed";
import { SafeArea } from "../../components/layout/SafeArea";
import { Header } from "../../components/impact/Header";
import { ImpactCard } from "../../components/impact/ImpactCard";

export default function ImpactScreen() {
  const handleViewStreaks = () => {
    // Handle viewing streaks
    console.log("View streaks");
  };

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="$4" flex={1}>
          <VStack space="xl">
            <Header onViewStreaks={handleViewStreaks} />
            <ImpactCard
              title="Emissions"
              color="#16A34A"
              emoji="🌱"
              yourImpact="2.5 tons"
              ourImpact="1,250 tons"
            />
            <ImpactCard
              title="Plastic"
              color="#0284C7"
              emoji="🌊"
              yourImpact="45 kg"
              ourImpact="22,500 kg"
            />
            <ImpactCard
              title="Positivity"
              color="#D97706"
              emoji="😊"
              yourImpact="128"
              ourImpact="64,000"
            />
            <ImpactCard
              title="Waste"
              color="#7C3AED"
              emoji="♻️"
              yourImpact="120 kg"
              ourImpact="60,000 kg"
            />
          </VStack>
        </Box>
      </ScrollView>
    </SafeArea>
  );
}
