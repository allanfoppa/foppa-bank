export interface NotificationService {
  sendWelcomeEmail(params: { name: string; email: string }): Promise<void>;
}
