import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import {
  ACCOUNT_REPOSITORY,
  NOTIFICATION_SERVICE,
} from '../../../../application/port/out/tokens';
import { CreateAccountService } from '../../../../application/port/out/account-create.service';
import { GetAccountService } from '../../../../application/port/out/account-get.service';
import type { AccountRepository } from '../../../../application/port/out/account.repository';
import {
  CREATE_ACCOUNT_USE_CASE,
  GET_ACCOUNT_USE_CASE,
} from '../../../../application/port/in/tokens';
import type { NotificationService } from '../../../../application/port/out/notification.service';
import { InMemoryAccountRepository } from '../../../adapter/out/persistence/account/account.repository';
import { EmailNotificationService } from '../../../adapter/out/notification/email-notification.service';

@Module({
  controllers: [AccountController],
  providers: [
    { provide: ACCOUNT_REPOSITORY, useClass: InMemoryAccountRepository },
    { provide: NOTIFICATION_SERVICE, useClass: EmailNotificationService },
    {
      provide: CREATE_ACCOUNT_USE_CASE,
      useFactory: (repo: AccountRepository, notifier: NotificationService) =>
        new CreateAccountService(repo, notifier),
      inject: [ACCOUNT_REPOSITORY, NOTIFICATION_SERVICE],
    },
    {
      provide: GET_ACCOUNT_USE_CASE,
      useFactory: (repo: AccountRepository) => new GetAccountService(repo),
      inject: [ACCOUNT_REPOSITORY],
    },
  ],
  exports: [CREATE_ACCOUNT_USE_CASE, GET_ACCOUNT_USE_CASE],
})
export class AccountModule {}
