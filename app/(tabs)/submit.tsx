import {
  Box,
  ScrollView,
  VStack,
  Text,
  Pressable,
  HStack,
  Input,
  Textarea,
  Button,
  Icon,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeIn,
  SlideInRight,
  Layout,
} from "react-native-reanimated";

interface Category {
  title: string;
  emoji: string;
  description: string;
  type: "text" | "both";
  gradient: [string, string];
}

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
  {
    title: "Song of the Day",
    emoji: "🎵",
    description: "Share a song that inspires positivity",
    type: "text",
    gradient: ["#7C3AED", "#7C3AEDCC"],
  },
  {
    title: "Motivation of the Day",
    emoji: "⚡️",
    description: "Share a motivational message",
    type: "text",
    gradient: ["#D97706", "#D97706CC"],
  },
  {
    title: "Lesson of the Day",
    emoji: "📚",
    description: "Share a valuable life lesson",
    type: "text",
    gradient: ["#16A34A", "#16A34ACC"],
  },
  {
    title: "Animal of the Day",
    emoji: "🦈",
    description: "Share an interesting animal fact with a photo",
    type: "both",
    gradient: ["#0284C7", "#0284C7CC"],
  },
  {
    title: "Nature of the Day",
    emoji: "🌳",
    description: "Share a fascinating nature fact with a photo",
    type: "both",
    gradient: ["#7C3AED", "#7C3AEDCC"],
  },
  {
    title: "Fact of the Day",
    emoji: "🧠",
    description: "Share an interesting scientific or general fact",
    type: "text",
    gradient: ["#D97706", "#D97706CC"],
  },
  {
    title: "Film of the Day",
    emoji: "🎬",
    description: "Share an uplifting or inspiring film",
    type: "text",
    gradient: ["#16A34A", "#16A34ACC"],
  },
  {
    title: "Book of the Day",
    emoji: "📖",
    description: "Share a book that changed your perspective",
    type: "text",
    gradient: ["#0284C7", "#0284C7CC"],
  },
];

const CategoryCard = ({
  category,
  isSelected,
  onPress,
  index,
}: {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}) => (
  <Animated.View
    entering={FadeInDown.duration(600).delay(index * 100)}
    layout={Layout}
  >
    <Pressable
      onPress={onPress}
      mb="$4"
      opacity={isSelected ? 1 : 0.7}
      sx={{
        ":active": {
          opacity: 0.8,
        },
      }}
    >
      <LinearGradient
        colors={category.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 24,
          borderWidth: isSelected ? 3 : 0,
          borderColor: "white",
        }}
      >
        <HStack space="md" alignItems="center">
          <Text fontSize={28}>{category.emoji}</Text>
          <VStack space="xs" flex={1}>
            <Text size="lg" color="$white" fontWeight="$bold">
              {category.title}
            </Text>
            <Text size="sm" color="rgba(255, 255, 255, 0.8)">
              {category.description}
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>
    </Pressable>
  </Animated.View>
);

export default function SubmitScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p="$4" flex={1}>
          <Animated.View entering={FadeIn.duration(600)}>
            <VStack space="xl">
              <VStack space="xs">
                <Text
                  size="2xl"
                  fontWeight="$bold"
                  letterSpacing={-1}
                  color="$textLight900"
                >
                  Submit Content
                </Text>
                <Text size="lg" color="$textLight500">
                  Share your inspiration with others
                </Text>
              </VStack>

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
                      onPress={() => setSelectedCategory(category)}
                      index={index}
                    />
                  ))}
                </VStack>
              ) : (
                <Animated.View
                  entering={SlideInRight.duration(400)}
                  layout={Layout}
                >
                  <VStack space="xl">
                    <Pressable
                      onPress={() => setSelectedCategory(null)}
                      mb="$4"
                    >
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
                      <Animated.View
                        entering={FadeInDown.duration(400)}
                        layout={Layout}
                      >
                        <VStack space="md">
                          <Text size="sm" color="$textLight500">
                            Add Photo
                          </Text>
                          <HStack space="md">
                            <Pressable
                              flex={1}
                              borderWidth={1}
                              borderStyle="dashed"
                              borderColor="$borderLight400"
                              borderRadius="$xl"
                              p="$6"
                              alignItems="center"
                              justifyContent="center"
                              bg={hasImage ? "$primary50" : "transparent"}
                              onPress={() => setHasImage(!hasImage)}
                            >
                              <VStack space="sm" alignItems="center">
                                <Icon
                                  as={hasImage ? ImageIcon : Camera}
                                  size="xl"
                                  color={
                                    hasImage ? "$primary500" : "$textLight400"
                                  }
                                />
                                <Text
                                  size="sm"
                                  color={
                                    hasImage ? "$primary500" : "$textLight400"
                                  }
                                >
                                  {hasImage ? "Change Photo" : "Take Photo"}
                                </Text>
                              </VStack>
                            </Pressable>
                          </HStack>
                        </VStack>
                      </Animated.View>
                    )}

                    <Animated.View
                      entering={FadeInDown.duration(400).delay(200)}
                      layout={Layout}
                    >
                      <Button
                        size="lg"
                        variant="solid"
                        action="primary"
                        isDisabled={!title || !content}
                        onPress={handleSubmit}
                        mt="$4"
                      >
                        <Button.Text>Submit</Button.Text>
                      </Button>
                    </Animated.View>
                  </VStack>
                </Animated.View>
              )}
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
