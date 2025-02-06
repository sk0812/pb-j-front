import {
  Box,
  ScrollView,
  VStack,
  Text,
  Pressable,
  Image,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  FadeInDown,
  FadeIn,
  Layout,
} from "react-native-reanimated";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  imageUrl: string;
  category: string;
  date: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Breakthrough in Renewable Energy Storage",
    summary:
      "Scientists develop new battery technology that could revolutionize clean energy storage",
    fullContent:
      "A team of researchers has developed a groundbreaking new battery technology that could solve one of renewable energy's biggest challenges: storage. The new system, which uses abundant and sustainable materials, can store energy for longer periods and at a fraction of the cost of current solutions. This breakthrough could accelerate the global transition to renewable energy sources and help combat climate change more effectively.\n\nThe technology works by utilizing a novel combination of organic compounds that can hold and release energy with unprecedented efficiency. Early tests show the system can maintain over 95% of its capacity after thousands of charge cycles, significantly outperforming current battery technologies.",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    category: "Science",
    date: "2024-03-15",
  },
  {
    id: "2",
    title: "Global Forest Coverage Increases",
    summary:
      "New data shows significant increase in forest restoration efforts worldwide",
    fullContent:
      "In a remarkable turn of events, global forest coverage has shown a significant increase for the first time in decades, according to the latest satellite data. Conservation efforts and large-scale reforestation projects across multiple continents have contributed to this positive trend.\n\nThe report indicates that over 2 million hectares of new forest have been established in the past year alone, with particularly strong results in South America and Southeast Asia. This increase in forest coverage is expected to have far-reaching benefits for biodiversity, climate regulation, and local communities.",
    imageUrl:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop",
    category: "Environment",
    date: "2024-03-14",
  },
  {
    id: "3",
    title: "Community Initiative Transforms Urban Spaces",
    summary:
      "Local volunteers create green spaces in urban areas, improving city life",
    fullContent:
      "A grassroots movement is transforming urban landscapes across major cities, with community volunteers converting unused spaces into thriving green areas. The initiative, which began in a single neighborhood, has now spread to over 50 cities worldwide.\n\nThese urban gardens and parks not only provide beautiful spaces for recreation but also contribute to improved air quality, reduced urban heat island effects, and enhanced community bonds. The project has been so successful that several city governments are now implementing similar programs as part of their official urban development plans.",
    imageUrl:
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&auto=format&fit=crop",
    category: "Community",
    date: "2024-03-13",
  },
];

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard = ({ article }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(200);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    };
  });

  const handlePress = () => {
    height.value = isExpanded ? 200 : 400;
    setIsExpanded(!isExpanded);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[animatedStyle]} layout={Layout}>
        <Box
          overflow="hidden"
          borderRadius={24}
          bg="$white"
          mb="$4"
          style={{
            height: "100%",
          }}
        >
          <Image
            source={{ uri: article.imageUrl }}
            alt={article.title}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            bg="rgba(0, 0, 0, 0.5)"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <Box
            p="$6"
            style={{
              height: "100%",
            }}
          >
            <VStack space="xs" flex={1}>
              <Box
                bg="$white"
                px="$2"
                py="$1"
                borderRadius="$lg"
                alignSelf="flex-start"
                opacity={0.9}
              >
                <Text size="xs" color="$textLight900">
                  {article.category} • {article.date}
                </Text>
              </Box>
              <Text
                size="xl"
                color="$white"
                fontWeight="$bold"
                numberOfLines={isExpanded ? undefined : 2}
              >
                {article.title}
              </Text>
              <Text
                size="sm"
                color="$white"
                numberOfLines={isExpanded ? undefined : 2}
                opacity={0.9}
              >
                {isExpanded ? article.fullContent : article.summary}
              </Text>
              <Text size="xs" color="$white" mt="auto" opacity={0.8}>
                {isExpanded ? "Tap to collapse" : "Tap to read more"}
              </Text>
            </VStack>
          </Box>
        </Box>
      </Animated.View>
    </Pressable>
  );
};

export default function NewsScreen() {
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
                  Positive News
                </Text>
                <Text size="lg" color="$textLight500">
                  Stay updated with the latest positive news
                </Text>
              </VStack>

              <VStack space="md">
                {newsArticles.map((article, index) => (
                  <Animated.View
                    key={article.id}
                    entering={FadeInDown.duration(600).delay(index * 200)}
                  >
                    <NewsCard article={article} />
                  </Animated.View>
                ))}
              </VStack>
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
