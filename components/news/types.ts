export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface NewsCardProps {
  article: NewsArticle;
  index?: number;
} 