import { AccountDomainException } from './account.domain-exception';

export class AccountDomainEntity {
  private constructor(
    private readonly id: string,
    private name: string,
    private email: string,
    private balance: number,
  ) {}

  static create(params: {
    id: string;
    name: string;
    email: string;
    initialDeposit: number;
  }): AccountDomainEntity {
    const { id, name, email, initialDeposit } = params;

    if (!name.trim()) {
      throw AccountDomainException.nameRequired();
    }
    if (!email.trim() || !email.includes('@')) {
      throw AccountDomainException.validEmailRequired();
    }
    if (initialDeposit < 0) {
      throw AccountDomainException.initialDepositCannotBeNegative();
    }

    return new AccountDomainEntity(
      id,
      name.trim(),
      email.trim().toLowerCase(),
      initialDeposit,
    );
  }

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getBalance(): number {
    return this.balance;
  }

  get getEmail(): string {
    return this.email;
  }

  get getToDTO(): { id: string; name: string; email: string; balance: number } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      balance: this.balance,
    };
  }
}
