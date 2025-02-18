import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Heading,
  Input,
  InputField,
  Text,
  View,
  VStack,
  HStack,
  Progress,
  ProgressFilledTrack,
  Box,
} from "@gluestack-ui/themed";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react-native";
import { useSignup } from "../../../contexts/SignupContext";

const { width } = Dimensions.get("window");

const Step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type Step1Data = z.infer<typeof Step1Schema>;

export default function SignupStep1() {
  const { updateSignupData } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(Step1Schema),
  });

  const onSubmit = (data: Step1Data) => {
    updateSignupData(data);
    router.push("/(auth)/signup/step2");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Section */}
        <VStack space="lg">
          <HStack alignItems="center" space="lg">
            <Button
              variant="link"
              onPress={() => router.back()}
              p="$0"
              style={styles.backButton}
            >
              <ChevronLeft size={28} color="#006AD4" />
            </Button>
            <Box flex={1} pr={40}>
              <Progress value={33} h={3} bg="$blue100" rounded="$full">
                <ProgressFilledTrack bg="$blue500" rounded="$full" />
              </Progress>
            </Box>
          </HStack>
        </VStack>

        {/* Header Section */}
        <VStack space="sm" mt="$6">
          <Heading size="2xl" fontWeight="$semibold" letterSpacing={0.5}>
            Let's get started
          </Heading>
          <Text
            size="lg"
            color="$gray600"
            letterSpacing={0.5}
            style={styles.subtitle}
          >
            First, tell us about yourself
          </Text>
        </VStack>

        {/* Form Section */}
        <VStack space="xl" style={styles.form}>
          <HStack space="md">
            <FormControl
              isInvalid={!!errors.firstName}
              size="lg"
              isRequired
              flex={1}
            >
              <FormControlLabel mb="$2">
                <FormControlLabelText color="$gray700">
                  First Name
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    borderWidth={1}
                    borderColor={
                      errors.firstName
                        ? "$red300"
                        : value
                        ? "$blue300"
                        : "$gray200"
                    }
                    $focus-outlineColor="$blue400"
                    borderRadius="$lg"
                  >
                    <InputField
                      placeholder="Enter your first name"
                      value={value}
                      onChangeText={onChange}
                      fontSize="$lg"
                      px="$4"
                      py="$3"
                      placeholderTextColor="$gray400"
                    />
                  </Input>
                )}
              />
              {errors.firstName && (
                <FormControlError>
                  <FormControlErrorText color="$red500">
                    {errors.firstName.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!errors.lastName}
              size="lg"
              isRequired
              flex={1}
            >
              <FormControlLabel mb="$2">
                <FormControlLabelText color="$gray700">
                  Last Name
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    borderWidth={1}
                    borderColor={
                      errors.lastName
                        ? "$red300"
                        : value
                        ? "$blue300"
                        : "$gray200"
                    }
                    $focus-outlineColor="$blue400"
                    borderRadius="$lg"
                  >
                    <InputField
                      placeholder="Enter your last name"
                      value={value}
                      onChangeText={onChange}
                      fontSize="$lg"
                      px="$4"
                      py="$3"
                      placeholderTextColor="$gray400"
                    />
                  </Input>
                )}
              />
              {errors.lastName && (
                <FormControlError>
                  <FormControlErrorText color="$red500">
                    {errors.lastName.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </HStack>

          <FormControl isInvalid={!!errors.email} size="lg" isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText color="$gray700">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  size="xl"
                  borderWidth={1}
                  borderColor={
                    errors.email ? "$red300" : value ? "$blue300" : "$gray200"
                  }
                  $focus-outlineColor="$blue400"
                  borderRadius="$lg"
                >
                  <InputField
                    placeholder="Enter your email address"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    fontSize="$lg"
                    px="$4"
                    py="$3"
                    placeholderTextColor="$gray400"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.email.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </VStack>

        {/* Action Button */}
        <Button
          size="xl"
          backgroundColor="$blue500"
          borderRadius="$2xl"
          height={64}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          shadowColor="$blue500"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={8}
        >
          <Button.Text fontWeight="$bold" size="lg" letterSpacing={0.5}>
            Continue
          </Button.Text>
        </Button>
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
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    opacity: 0.8,
  },
  form: {
    marginTop: 40,
  },
  button: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
  },
});
