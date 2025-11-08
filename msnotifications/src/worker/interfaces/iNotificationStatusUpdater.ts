export interface INotificationStatusUpdater {
  markAsProcessing(notificationId: string): Promise<void>;
  markAsSuccess(notificationId: string): Promise<void>;
  markAsFailure(notificationId: string, errorMessage: string): Promise<void>;
}