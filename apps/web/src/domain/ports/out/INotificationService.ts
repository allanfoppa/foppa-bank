export interface INotificationService {
  notify(message: string, type: 'success' | 'error' | 'info'): void;
}
