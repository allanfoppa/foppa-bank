import { AccountDomainException } from '../../../domain/features/account/account.domain-exception';
import { AccountDomainEntity } from '../../../domain/features/account/account.domain-entity';
import type { AccountRepository } from '../../port/out/account.repository';
import type {
  GetAccountCommand,
  GetAccountResult,
  GetAccountUseCase,
} from '../../port/in/get-account.use-case';

export class GetAccountService implements GetAccountUseCase {
  constructor(private readonly repo: AccountRepository) {}

  async execute(command: GetAccountCommand): Promise<GetAccountResult> {
    const exists = await this.repo.findByEmail(command.email);

    if (!exists) {
      throw AccountDomainException.accountNotFound(command.email);
    }

    const account = AccountDomainEntity.get({
      email: command.email,
    });

    return account.getToDTO;
  }
}
