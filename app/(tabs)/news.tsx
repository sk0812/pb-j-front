import { Box, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { SafeArea } from "../../components/layout/SafeArea";
import { NewsCard } from "../../components/news/NewsCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { newsArticles } from "../../components/news/data";

export default function NewsScreen() {
  return (
    <SafeArea>
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
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </VStack>
            </VStack>
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeArea>
  );
}
