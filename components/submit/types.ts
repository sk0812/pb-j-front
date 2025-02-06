export interface Category {
  title: string;
  emoji: string;
  description: string;
  type: "text" | "both";
  gradient: [string, string];
}

export interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export interface SubmitFormProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
} 