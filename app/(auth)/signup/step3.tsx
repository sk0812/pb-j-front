import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Heading,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Text,
  View,
  VStack,
  HStack,
  Progress,
  ProgressFilledTrack,
  Pressable,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react-native";
import { useSignup } from "../../../contexts/SignupContext";
import { authApi } from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Step3Schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Step3Data = z.infer<typeof Step3Schema>;

export default function SignupStep3() {
  const { signupData, clearSignupData } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(Step3Schema),
  });

  const onSubmit = async (data: Step3Data) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if we have all required data
      if (!signupData.email || !signupData.firstName || !signupData.lastName) {
        setError(
          "Missing required information. Please go back and fill in all fields."
        );
        return;
      }

      const response = await authApi.signup({
        email: signupData.email,
        password: data.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        phoneNumber: signupData.phoneNumber,
      });

      // Clear signup data
      clearSignupData();

      // Show success message
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.replace("/(auth)/login");
      }, 2000);
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
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
            <Progress
              value={100}
              w={width * 0.5}
              h="$2"
              bg="$blue100"
              rounded="$full"
            >
              <ProgressFilledTrack bg="$blue500" rounded="$full" />
            </Progress>
          </HStack>
          <VStack space="sm">
            <Heading size="2xl" fontWeight="$semibold" letterSpacing={0.5}>
              Create Password
            </Heading>
            <Text size="lg" color="$gray600" letterSpacing={0.5}>
              Keep your account secure
            </Text>
          </VStack>
        </VStack>

        {/* Form */}
        {success ? (
          <VStack
            space="md"
            alignItems="center"
            style={{
              flex: 1,
              justifyContent: "center",
              paddingBottom: 100,
            }}
          >
            <Text color="$green500" fontSize="$xl" fontWeight="$bold">
              Account created successfully!
            </Text>
            <Text color="$gray600" textAlign="center">
              Redirecting you to login...
            </Text>
          </VStack>
        ) : (
          <VStack space="xl" style={styles.form}>
            <FormControl isInvalid={!!errors.password} size="lg" isRequired>
              <FormControlLabel>
                <FormControlLabelText color="$gray700">
                  Password
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    borderWidth={1}
                    borderColor={
                      errors.password
                        ? "$red300"
                        : value
                        ? "$blue300"
                        : "$gray200"
                    }
                    $focus-outlineColor="$blue400"
                    borderRadius="$lg"
                  >
                    <InputField
                      placeholder="Create a strong password"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      fontSize="$lg"
                      px="$4"
                      py="$3"
                      placeholderTextColor="$gray400"
                    />
                    <InputSlot pr="$4">
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <InputIcon
                          as={showPassword ? EyeOff : Eye}
                          color="$gray400"
                          size="lg"
                        />
                      </Pressable>
                    </InputSlot>
                  </Input>
                )}
              />
              {errors.password ? (
                <FormControlError>
                  <FormControlErrorText color="$red500">
                    {errors.password.message}
                  </FormControlErrorText>
                </FormControlError>
              ) : (
                <FormControlHelper>
                  <FormControlHelperText color="$gray600">
                    Must contain uppercase, lowercase, number, and special
                    character
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!errors.confirmPassword}
              size="lg"
              isRequired
            >
              <FormControlLabel>
                <FormControlLabelText color="$gray700">
                  Confirm Password
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    borderWidth={1}
                    borderColor={
                      errors.confirmPassword
                        ? "$red300"
                        : value
                        ? "$blue300"
                        : "$gray200"
                    }
                    $focus-outlineColor="$blue400"
                    borderRadius="$lg"
                  >
                    <InputField
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      fontSize="$lg"
                      px="$4"
                      py="$3"
                      placeholderTextColor="$gray400"
                    />
                    <InputSlot pr="$4">
                      <Pressable
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <InputIcon
                          as={showConfirmPassword ? EyeOff : Eye}
                          color="$gray400"
                          size="lg"
                        />
                      </Pressable>
                    </InputSlot>
                  </Input>
                )}
              />
              {errors.confirmPassword && (
                <FormControlError>
                  <FormControlErrorText color="$red500">
                    {errors.confirmPassword.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </VStack>
        )}

        {/* Action Button */}
        <Button
          size="xl"
          backgroundColor="$blue500"
          borderRadius="$xl"
          height={60}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          shadowColor="$blue500"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={8}
          isDisabled={isLoading || success}
        >
          <Button.Text fontWeight="$semibold" size="lg" letterSpacing={0.5}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button.Text>
        </Button>

        {error && (
          <Text color="$red500" textAlign="center" style={styles.errorText}>
            {error}
          </Text>
        )}
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
  form: {
    marginTop: 40,
  },
  button: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
  },
  errorText: {
    position: "absolute",
    bottom: 120,
    left: 24,
    right: 24,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 100,
  },
});
