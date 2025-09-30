import { AccountDomainEntity } from '../../../domain/account/account.domain-entity';

export interface AccountRepository {
  findByEmail(email: string): Promise<AccountDomainEntity | null>;
  save(account: AccountDomainEntity): Promise<void>;
}
