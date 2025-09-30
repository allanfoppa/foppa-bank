import { Injectable } from '@nestjs/common';
import type { NotificationService } from '../../../../application/port/out/notification.service';

@Injectable()
export class EmailNotificationService implements NotificationService {
  sendWelcomeEmail(params: { name: string; email: string }): Promise<void> {
    // Replace with real email integration
    console.log(`[Email] Welcome ${params.name}! Email: ${params.email}`);
    return Promise.resolve();
  }
}
