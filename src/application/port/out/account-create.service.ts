import { randomUUID } from 'crypto';
import { AccountDomainException } from '../../../domain/features/account/account.domain-exception';
import { AccountDomainEntity } from '../../../domain/features/account/account.domain-entity';
import type { AccountRepository } from '../../port/out/account.repository';
import type { NotificationService } from '../../port/out/notification.service';
import type {
  CreateAccountCommand,
  CreateAccountResult,
  CreateAccountUseCase,
} from '../../port/in/create-account.use-case';

export class CreateAccountService implements CreateAccountUseCase {
  constructor(
    private readonly repo: AccountRepository,
    private readonly notifier: NotificationService,
  ) {}

  async execute(command: CreateAccountCommand): Promise<CreateAccountResult> {
    const exists = await this.repo.findByEmail(command.email);
    if (exists)
      throw AccountDomainException.accountAlreadyExists(command.email);

    const account = AccountDomainEntity.create({
      id: randomUUID(),
      name: command.name,
      email: command.email,
      initialDeposit: command.initialDeposit,
    });

    await this.repo.save(account);
    await this.notifier.sendWelcomeEmail({
      name: command.name,
      email: command.email,
    });

    return account.getToDTO;
  }
}
