export interface DailyCardProps {
  title: string;
  emoji: string;
  frontContent: string;
  backContent: string;
  spotifyLink?: string;
}

export interface GradientColors {
  [key: string]: [string, string];
}

export const gradients: GradientColors = {
  "Quote of the Day": ["#16A34A", "#16A34ACC"],
  "Joke of the Day": ["#0284C7", "#0284C7CC"],
  "Song of the Day": ["#7C3AED", "#7C3AEDCC"],
  "Motivation of the Day": ["#D97706", "#D97706CC"],
  "Lesson of the Day": ["#16A34A", "#16A34ACC"],
  "Animal of the Day": ["#0284C7", "#0284C7CC"],
  "Nature of the Day": ["#7C3AED", "#7C3AEDCC"],
  "Fact of the Day": ["#D97706", "#D97706CC"],
  "Film of the Day": ["#16A34A", "#16A34ACC"],
  "Book of the Day": ["#0284C7", "#0284C7CC"],
}; 