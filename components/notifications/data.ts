import { Notification } from "./types";

export const notifications: Notification[] = [
  {
    id: "1",
    type: "achievement",
    title: "New Achievement Unlocked! 🏆",
    message: "You've completed 10 environmental tasks. Keep up the great work!",
    timestamp: "2024-03-15T10:30:00Z",
    isRead: false,
    emoji: "🌍",
    color: "#16A34A",
  },
  {
    id: "2",
    type: "streak",
    title: "7 Day Streak! 🔥",
    message: "You've been making a positive impact every day this week. Amazing dedication!",
    timestamp: "2024-03-15T09:15:00Z",
    isRead: false,
    emoji: "⚡️",
    color: "#D97706",
  },
  {
    id: "3",
    type: "community",
    title: "Community Milestone 🎉",
    message: "Together, we've saved 1,000 tons of CO2 emissions! Thank you for being part of this journey.",
    timestamp: "2024-03-14T16:45:00Z",
    isRead: true,
    emoji: "🌱",
    color: "#0284C7",
  },
  {
    id: "4",
    type: "system",
    title: "New Feature Available",
    message: "Check out our new task tracking system to better monitor your daily impact.",
    timestamp: "2024-03-14T12:20:00Z",
    isRead: true,
    emoji: "✨",
    color: "#7C3AED",
  },
]; 