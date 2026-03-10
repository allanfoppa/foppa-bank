import { INotificationService } from '../../core/domain/ports/out/INotificationService';
import toast from 'react-hot-toast';

/**
 * UI layer adapter for notifications using react-hot-toast
 * This keeps the infrastructure layer framework-agnostic
 */
export class ReactToastNotificationService implements INotificationService {
  notify(message: string, type: 'success' | 'error' | 'info'): void {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast(message);
        break;
      default:
        toast(message);
    }
  }
}
