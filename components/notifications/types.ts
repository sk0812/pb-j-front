export type NotificationType = 'achievement' | 'streak' | 'community' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  emoji?: string;
  actionUrl?: string;
  color?: string;
} 