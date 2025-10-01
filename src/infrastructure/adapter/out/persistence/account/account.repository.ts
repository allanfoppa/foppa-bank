import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../../../application/port/out/account.repository';
import { AccountDomainEntity } from '../../../../../domain/account/account.domain-entity';

@Injectable()
export class InMemoryAccountRepository implements AccountRepository {
  private readonly byEmail = new Map<string, AccountDomainEntity>();

  findByEmail(email: string): Promise<AccountDomainEntity | null> {
    return Promise.resolve(this.byEmail.get(email.toLowerCase()) ?? null);
  }

  save(account: AccountDomainEntity): Promise<void> {
    this.byEmail.set(account.getEmail.toLowerCase(), account);
    return Promise.resolve();
  }
}
