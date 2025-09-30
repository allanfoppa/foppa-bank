import { DomainValidationException } from './account.domain-exception';

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
    if (!name?.trim()) {
      throw new DomainValidationException('Name is required');
    }
    if (!email?.trim() || !email.includes('@')) {
      throw new DomainValidationException('Valid email is required');
    }
    if (initialDeposit < 0) {
      throw new DomainValidationException('Initial deposit cannot be negative');
    }

    return new AccountDomainEntity(
      id,
      name.trim(),
      email.trim().toLowerCase(),
      initialDeposit,
    );
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new DomainValidationException('Deposit must be positive');
    }
    this.balance += amount;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  toDTO(): { id: string; name: string; email: string; balance: number } {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      balance: this.balance,
    };
  }
}
