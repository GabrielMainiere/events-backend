export class UserPreferenceResponse {
  id: string;
  userId: string;
  notificationType: string;
  channel: string;
  isEnabled: boolean;
  updatedAt: Date;

  constructor(data: Partial<UserPreferenceResponse>) {
    Object.assign(this, data);
  }
}