import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
  Icon,
  Pressable,
} from "@gluestack-ui/themed";
import { Camera, X, MapPin, Mail, Phone, User } from "lucide-react-native";
import { useState } from "react";

interface ProfileSheetProps {
  onClose: () => void;
}

export const ProfileSheet = ({ onClose }: ProfileSheetProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    phoneNumber: "",
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    onClose();
  };

  const renderInputWithIcon = (
    label: string,
    value: string,
    placeholder: string,
    icon: any,
    keyboardType: string = "default",
    field: keyof typeof formData
  ) => (
    <FormControl>
      <FormControl.Label>
        <Text size="sm" color="$textLight500">
          {label}
        </Text>
      </FormControl.Label>
      <Box
        borderWidth={1}
        borderColor="$borderLight200"
        borderRadius="$lg"
        bg="$backgroundLight50"
      >
        <HStack alignItems="center" space="sm">
          <Box p="$3" borderRightWidth={1} borderRightColor="$borderLight200">
            <Icon as={icon} size="md" color="$primary500" />
          </Box>
          <Input flex={1} borderWidth={0} size="md">
            <Input.Input
              placeholder={placeholder}
              placeholderTextColor="$textLight400"
              keyboardType={keyboardType as any}
              autoCapitalize="none"
              value={value}
              onChangeText={(text: string) =>
                setFormData((prev) => ({ ...prev, [field]: text }))
              }
            />
          </Input>
        </HStack>
      </Box>
    </FormControl>
  );

  return (
    <Box flex={1} bg="$white">
      <VStack space="lg" flex={1}>
        {/* Header */}
        <Box
          bg="$primary50"
          borderBottomWidth={1}
          borderBottomColor="$borderLight100"
          pt="$4"
          pb="$6"
          px="$6"
        >
          <HStack justifyContent="space-between" alignItems="center" mb="$4">
            <Text size="xl" fontWeight="$bold" color="$textLight900">
              Profile
            </Text>
            <Pressable
              onPress={onClose}
              p="$2"
              hitSlop={20}
              bg="$white"
              borderRadius="$full"
            >
              <Icon as={X} size="lg" color="$textLight500" />
            </Pressable>
          </HStack>

          <HStack space="md" alignItems="center">
            <Box position="relative">
              <Avatar size="lg" bg="$primary200">
                <Avatar.FallbackText>JD</Avatar.FallbackText>
              </Avatar>
              <Pressable
                position="absolute"
                bottom={-4}
                right={-4}
                bg="$white"
                p="$2"
                borderRadius="$full"
                borderWidth={1}
                borderColor="$borderLight200"
              >
                <Icon as={Camera} size="sm" color="$primary500" />
              </Pressable>
            </Box>
            <VStack>
              <Text size="lg" fontWeight="$semibold" color="$textLight900">
                {formData.fullName || "Add your name"}
              </Text>
              <Text size="sm" color="$textLight500">
                {formData.email || "Add your email"}
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Form */}
        <ScrollView flex={1} px="$6">
          <VStack space="xl">
            {renderInputWithIcon(
              "Full Name",
              formData.fullName,
              "Enter your full name",
              User,
              "default",
              "fullName"
            )}

            {renderInputWithIcon(
              "Email",
              formData.email,
              "Enter your email",
              Mail,
              "email-address",
              "email"
            )}

            {renderInputWithIcon(
              "Location",
              formData.location,
              "Enter your location",
              MapPin,
              "default",
              "location"
            )}

            {renderInputWithIcon(
              "Phone Number",
              formData.phoneNumber,
              "Enter your phone number",
              Phone,
              "phone-pad",
              "phoneNumber"
            )}
          </VStack>
        </ScrollView>

        {/* Footer */}
        <Box
          p="$6"
          borderTopWidth={1}
          borderTopColor="$borderLight100"
          bg="$backgroundLight50"
        >
          <Button
            size="lg"
            bg="$primary500"
            onPress={handleSave}
            borderRadius="$lg"
            $hover={{ bg: "$primary600" }}
            $active={{ bg: "$primary700" }}
          >
            <Button.Text color="$white" fontWeight="$medium">
              Save Changes
            </Button.Text>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
