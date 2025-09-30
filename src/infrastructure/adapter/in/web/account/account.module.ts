import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import {
  ACCOUNT_REPOSITORY,
  CREATE_ACCOUNT_USE_CASE,
  NOTIFICATION_SERVICE,
} from '../../../../../application/port/out/tokens';
import { InMemoryAccountRepository } from '../../../out/persistence/account/account.repository';
import { EmailNotificationService } from '../../../out/notification/email-notification.service';
import { AccountService } from '../../../../../application/use-cases/account.service';
import type { AccountRepository } from '../../../../../application/port/out/account.repository';
import type { NotificationService } from '../../../../../application/port/out/notification.service';

@Module({
  controllers: [AccountController],
  providers: [
    { provide: ACCOUNT_REPOSITORY, useClass: InMemoryAccountRepository },
    { provide: NOTIFICATION_SERVICE, useClass: EmailNotificationService },
    {
      provide: CREATE_ACCOUNT_USE_CASE,
      useFactory: (repo: AccountRepository, notifier: NotificationService) =>
        new AccountService(repo, notifier),
      inject: [ACCOUNT_REPOSITORY, NOTIFICATION_SERVICE],
    },
  ],
  exports: [CREATE_ACCOUNT_USE_CASE],
})
export class AccountModule {}
