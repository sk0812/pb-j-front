import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Pressable,
  Text,
  Textarea,
  VStack,
} from "@gluestack-ui/themed";
import { Camera, Image as ImageIcon } from "lucide-react-native";
import Animated, {
  FadeIn,
  SlideInRight,
  Layout,
} from "react-native-reanimated";
import { useState } from "react";
import { SubmitFormProps, Category } from "./types";
import { CategoryCard } from "./CategoryCard";

const categories: Array<Category> = [
  {
    title: "Quote of the Day",
    emoji: "💭",
    description: "Share an inspiring quote that moved you",
    type: "text",
    gradient: ["#16A34A", "#16A34ACC"],
  },
  {
    title: "Joke of the Day",
    emoji: "😄",
    description: "Share a clean, funny joke to brighten someone's day",
    type: "text",
    gradient: ["#0284C7", "#0284C7CC"],
  },
  // ... Add all other categories here
];

export const SubmitForm = ({
  selectedCategory,
  onCategoryChange,
}: SubmitFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const handleSubmit = () => {
    // Handle submission logic here
    console.log({
      category: selectedCategory?.title,
      title,
      content,
      hasImage,
    });
  };

  return (
    <VStack space="xl">
      {!selectedCategory ? (
        <VStack space="md">
          <Text size="lg" color="$textLight700" fontWeight="$medium">
            Select a category
          </Text>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              isSelected={selectedCategory?.title === category.title}
              onPress={() => onCategoryChange(category)}
              index={index}
            />
          ))}
        </VStack>
      ) : (
        <Animated.View entering={SlideInRight.duration(400)} layout={Layout}>
          <VStack space="xl">
            <Pressable onPress={() => onCategoryChange(null)} mb="$4">
              <Text size="sm" color="$primary500" fontWeight="$medium">
                ← Choose different category
              </Text>
            </Pressable>

            <VStack space="md">
              <Text size="sm" color="$textLight500">
                Title
              </Text>
              <Input>
                <Input.Input
                  placeholder="Enter a title"
                  value={title}
                  onChangeText={setTitle}
                />
              </Input>
            </VStack>

            <VStack space="md">
              <Text size="sm" color="$textLight500">
                Content
              </Text>
              <Textarea>
                <Textarea.Input
                  placeholder="Share your content..."
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={4}
                />
              </Textarea>
            </VStack>

            {selectedCategory.type === "both" && (
              <VStack space="md">
                <Text size="sm" color="$textLight500">
                  Add Photo
                </Text>
                <HStack space="md">
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => setHasImage(true)}
                  >
                    <Button.Text>Take Photo</Button.Text>
                    <Button.Icon as={Camera} ml="$2" />
                  </Button>
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={() => setHasImage(true)}
                  >
                    <Button.Text>Choose from Library</Button.Text>
                    <Button.Icon as={ImageIcon} ml="$2" />
                  </Button>
                </HStack>
              </VStack>
            )}

            <Button
              size="lg"
              mt="$4"
              onPress={handleSubmit}
              isDisabled={!title || !content}
            >
              <Button.Text>Submit</Button.Text>
            </Button>
          </VStack>
        </Animated.View>
      )}
    </VStack>
  );
};
