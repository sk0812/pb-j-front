import {
  Box,
  Button,
  ButtonIcon,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { SafeArea } from "../../components/layout/SafeArea";
import { DailyCard } from "../../components/daily/DailyCard";
import { dailyItems } from "../../components/daily/data";
import { History } from "lucide-react-native";
import { useState } from "react";
import { Modal } from "@gluestack-ui/themed";
import { PreviousDaysSheet } from "../../components/daily/PreviousDaysSheet";

export default function DailyScreen() {
  const [showPreviousDays, setShowPreviousDays] = useState(false);

  return (
    <SafeArea>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Box p="$4">
          <VStack space="xl">
            <VStack space="xs">
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mb="$2"
              >
                <Heading size="xl" letterSpacing={-1}>
                  Things of the Day
                </Heading>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => setShowPreviousDays(true)}
                >
                  <ButtonIcon as={History} mr="$2" />
                  <Button.Text>Previous Days</Button.Text>
                </Button>
              </HStack>

              <Text size="sm" color="$textLight500">
                Your daily dose of inspiration and knowledge
              </Text>
            </VStack>

            <VStack space="md">
              {dailyItems.map((item, index) => (
                <DailyCard key={index} {...item} />
              ))}
            </VStack>
          </VStack>
        </Box>
      </ScrollView>

      <Modal
        isOpen={showPreviousDays}
        onClose={() => setShowPreviousDays(false)}
        avoidKeyboard
        closeOnOverlayClick
      >
        <Modal.Content width="100%" height="90%">
          <PreviousDaysSheet onClose={() => setShowPreviousDays(false)} />
        </Modal.Content>
      </Modal>
    </SafeArea>
  );
}
