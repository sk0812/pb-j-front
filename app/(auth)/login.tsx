import React, { useState } from "react";
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
  InputIcon,
  InputSlot,
  Pressable,
  Text,
  View,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Eye, EyeOff, ChevronLeft } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof LoginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authApi.login(data.email, data.password);

      // Store the token
      await AsyncStorage.setItem("userToken", response.token);

      // Navigate to the main app
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <Button
          variant="link"
          onPress={() => router.back()}
          p="$0"
          style={styles.backButton}
        >
          <ChevronLeft size={28} color="#006AD4" />
        </Button>

        {/* Header Section */}
        <VStack space="sm" mt="$6">
          <Heading size="2xl" fontWeight="$semibold" letterSpacing={0.5}>
            Welcome Back
          </Heading>
          <Text
            size="lg"
            color="$gray600"
            letterSpacing={0.5}
            style={styles.subtitle}
          >
            Sign in to continue
          </Text>
        </VStack>

        {/* Form Section */}
        <VStack space="xl" style={styles.form}>
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
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
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
            {errors.email && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.email.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password} size="lg" isRequired>
            <FormControlLabel mb="$2">
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
                    placeholder="Enter your password"
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
            {errors.password && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.password.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </VStack>

        {/* Action Buttons */}
        <VStack space="md" style={styles.buttonContainer}>
          <Button
            size="xl"
            backgroundColor="$blue500"
            borderRadius="$2xl"
            height={64}
            onPress={handleSubmit(handleLogin)}
            shadowColor="$blue500"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.2}
            shadowRadius={8}
            isDisabled={isLoading}
          >
            <Button.Text fontWeight="$bold" size="lg" letterSpacing={0.5}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button.Text>
          </Button>

          {error && (
            <Text color="$red500" textAlign="center" mb="$4">
              {error}
            </Text>
          )}

          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/(auth)/signup/step1")}
          >
            <Text style={styles.linkText}>
              Don't have an account?{" "}
              <Text color="$blue500" fontWeight="$bold">
                Sign Up
              </Text>
            </Text>
          </Pressable>
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
  buttonContainer: {
    position: "absolute",
    bottom: 48,
    left: 24,
    right: 24,
  },
  linkButton: {
    alignItems: "center",
    padding: 8,
  },
  linkText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
