export interface UserPreference {
  id: string;
  userId: string;
  notificationType: string;
  channel: string;
  isEnabled: boolean;
  updatedAt: Date;
}