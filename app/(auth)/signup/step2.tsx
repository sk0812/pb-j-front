import React, { useState } from "react";
import { StyleSheet, Dimensions, Platform, Modal } from "react-native";
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
  Text,
  View,
  VStack,
  HStack,
  Progress,
  ProgressFilledTrack,
  Box,
  Pressable,
  InputSlot,
  InputIcon,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

const Step2Schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+44|0)(?:(?:(?:1(?:1[3-8]|2[1-356]|3[1-9]|4[1-7]|5[1-8]|6[1-9]|7[1-5]|8[1-8]|9[1-8])|2(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|3(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|4(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|5(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|6(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|7(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|8(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|9(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]))[0-9]{6,8})|(?:1(?:1[3-8]|2[1-356]|3[1-9]|4[1-7]|5[1-8]|6[1-9]|7[1-5]|8[1-8]|9[1-8])|2(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|3(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|4(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|5(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|6(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|7(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|8(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])|9(?:0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]))[0-9]{6,8})$/,
      "Please enter a valid UK phone number"
    )
    .transform((val) => {
      // Format phone number to standard format
      let cleaned = val.replace(/\D/g, "");
      if (cleaned.startsWith("44")) {
        cleaned = "0" + cleaned.substring(2);
      }
      return cleaned;
    }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use format YYYY-MM-DD"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .regex(
      /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
      "Please enter a valid UK postcode"
    )
    .transform((val) => val.toUpperCase().replace(/\s+/g, " ")),
});

type Step2Data = z.infer<typeof Step2Schema>;

export default function SignupStep2() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(Step2Schema),
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("dateOfBirth", formattedDate);
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS === "android") {
      if (showDatePicker) {
        return (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        );
      }
      return null;
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Button
                variant="link"
                onPress={() => setShowDatePicker(false)}
                style={styles.modalButton}
              >
                <Button.Text color="$blue500">Cancel</Button.Text>
              </Button>
              <Button
                variant="link"
                onPress={() => {
                  if (date) {
                    handleDateChange(null, date);
                  }
                  setShowDatePicker(false);
                }}
                style={styles.modalButton}
              >
                <Button.Text color="$blue500">Done</Button.Text>
              </Button>
            </View>
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="spinner"
              onChange={(e, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const onSubmit = (data: Step2Data) => {
    // Store data in global state or context
    router.push("/(auth)/signup/step3");
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
              <Progress value={66} h={3} bg="$blue100" rounded="$full">
                <ProgressFilledTrack bg="$blue500" rounded="$full" />
              </Progress>
            </Box>
          </HStack>
        </VStack>

        {/* Header Section */}
        <VStack space="sm" mt="$6">
          <Heading size="2xl" fontWeight="$semibold" letterSpacing={0.5}>
            Contact Details
          </Heading>
          <Text
            size="lg"
            color="$gray600"
            letterSpacing={0.5}
            style={styles.subtitle}
          >
            How can we reach you?
          </Text>
        </VStack>

        {/* Form Section */}
        <VStack space="xl" style={styles.form}>
          <FormControl isInvalid={!!errors.phoneNumber} size="lg" isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText color="$gray700">
                Phone Number
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  size="xl"
                  borderWidth={1}
                  borderColor={
                    errors.phoneNumber
                      ? "$red300"
                      : value
                      ? "$blue300"
                      : "$gray200"
                  }
                  $focus-outlineColor="$blue400"
                  borderRadius="$lg"
                >
                  <InputField
                    placeholder="Enter phone number (e.g. 07123456789)"
                    value={value}
                    onChangeText={(text) => {
                      // Allow only numbers, spaces, plus, and hyphens
                      const formatted = text.replace(/[^\d\s+-]/g, "");
                      onChange(formatted);
                    }}
                    keyboardType="phone-pad"
                    fontSize="$lg"
                    px="$4"
                    py="$3"
                    placeholderTextColor="$gray400"
                    maxLength={15}
                  />
                </Input>
              )}
            />
            {errors.phoneNumber && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.phoneNumber.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.dateOfBirth} size="lg" isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText color="$gray700">
                Date of Birth
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value } }) => (
                <View>
                  <Pressable
                    style={({ pressed }) => [
                      styles.datePickerButton,
                      pressed && styles.datePickerButtonPressed,
                    ]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Input
                      size="xl"
                      borderWidth={1}
                      borderColor={
                        errors.dateOfBirth
                          ? "$red300"
                          : value
                          ? "$blue300"
                          : "$gray200"
                      }
                      $focus-outlineColor="$blue400"
                      borderRadius="$lg"
                      pointerEvents="none"
                    >
                      <InputField
                        placeholder="Select your date of birth"
                        value={date ? date.toLocaleDateString() : ""}
                        editable={false}
                        fontSize="$lg"
                        px="$4"
                        py="$3"
                        placeholderTextColor="$gray400"
                      />
                      <InputSlot pr="$3">
                        <InputIcon as={Calendar} color="$gray400" />
                      </InputSlot>
                    </Input>
                  </Pressable>
                  {renderDatePicker()}
                </View>
              )}
            />
            {errors.dateOfBirth && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.dateOfBirth.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.postcode} size="lg" isRequired>
            <FormControlLabel mb="$2">
              <FormControlLabelText color="$gray700">
                Postcode
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="postcode"
              render={({ field: { onChange, value } }) => (
                <Input
                  size="xl"
                  borderWidth={1}
                  borderColor={
                    errors.postcode
                      ? "$red300"
                      : value
                      ? "$blue300"
                      : "$gray200"
                  }
                  $focus-outlineColor="$blue400"
                  borderRadius="$lg"
                >
                  <InputField
                    placeholder="Enter postcode (e.g., SW1A 1AA)"
                    value={value}
                    onChangeText={(text) => {
                      // Format postcode as user types
                      const formatted = text
                        .toUpperCase()
                        .replace(/[^A-Z0-9 ]/g, "")
                        .replace(/(.{4})(?=.)/g, "$1 ")
                        .trim();
                      onChange(formatted);
                    }}
                    autoCapitalize="characters"
                    fontSize="$lg"
                    px="$4"
                    py="$3"
                    placeholderTextColor="$gray400"
                    maxLength={8}
                  />
                </Input>
              )}
            />
            {errors.postcode && (
              <FormControlError>
                <FormControlErrorText color="$red500">
                  {errors.postcode.message}
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
  datePickerButton: {
    width: "100%",
  },
  datePickerButtonPressed: {
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  modalButton: {
    paddingHorizontal: 16,
  },
});
