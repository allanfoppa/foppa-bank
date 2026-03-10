import { INotificationService } from '../../../domain/ports/out/INotificationService';

/**
 * Framework-agnostic notification service for infrastructure layer
 * Uses console output - suitable for testing, CLI, or server environments
 * For UI notifications, use ReactToastNotificationService in the UI layer
 */
export class ConsoleNotificationService implements INotificationService {
  notify(message: string, type: 'success' | 'error' | 'info'): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;

    switch (type) {
      case 'success':
        console.log(`✓ ${prefix} ${message}`);
        break;
      case 'error':
        console.error(`✗ ${prefix} ${message}`);
        break;
      case 'info':
        console.info(`ℹ ${prefix} ${message}`);
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }
}
