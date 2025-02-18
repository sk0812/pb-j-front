import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Heading, Text, View, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";

const { height } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and Welcome Section */}
        <VStack space="3xl" alignItems="center" style={styles.header}>
          <VStack space="3xl" alignItems="center">
            <Heading
              size="4xl"
              color="$blue500"
              fontWeight="$bold"
              letterSpacing={1}
              style={styles.logo}
            >
              PB&J
            </Heading>
            <VStack space="md" alignItems="center">
              <Heading
                size="2xl"
                fontWeight="$semibold"
                letterSpacing={0.5}
                textAlign="center"
              >
                Make a Positive Impact
              </Heading>
              <Text
                size="lg"
                color="$gray600"
                textAlign="center"
                style={styles.subtitle}
                letterSpacing={0.5}
              >
                Join a community dedicated to spreading positivity and making
                the world a better place, one small action at a time
              </Text>
            </VStack>
          </VStack>
        </VStack>

        {/* Action Buttons */}
        <VStack space="md" style={styles.buttons}>
          <Link href="/(auth)/signup/step1" asChild>
            <Button
              size="xl"
              backgroundColor="$blue500"
              borderRadius="$xl"
              height={60}
              shadowColor="$blue500"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.2}
              shadowRadius={8}
            >
              <Button.Text fontWeight="$semibold" size="lg" letterSpacing={0.5}>
                Start Spreading Positivity
              </Button.Text>
            </Button>
          </Link>
          <Link href="/(auth)/login" asChild>
            <Button
              size="xl"
              variant="outline"
              borderColor="$blue500"
              borderRadius="$xl"
              height={60}
              backgroundColor="$white"
            >
              <Button.Text
                color="$blue500"
                fontWeight="$semibold"
                size="lg"
                letterSpacing={0.5}
              >
                I already have an account
              </Button.Text>
            </Button>
          </Link>
        </VStack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: height * 0.12,
  },
  logo: {
    fontSize: 64,
    textShadowColor: "rgba(0, 106, 212, 0.15)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    maxWidth: "85%",
    lineHeight: 28,
  },
  buttons: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
  },
});
