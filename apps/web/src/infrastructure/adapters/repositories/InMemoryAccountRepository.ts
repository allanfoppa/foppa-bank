import { Account } from "../../../domain/entities/Account";
import { IAccountRepository } from "../../../domain/ports/out/IAccountRepository";

export class InMemoryAccountRepository implements IAccountRepository {
  private accounts: Account[] = [
    {
      id: "123",
      balance: 1500.0,
      dailyLimit: 1000.0,
      owner: "Foppa Developer",
    },
    { id: "456", balance: 50.0, dailyLimit: 500.0, owner: "User Test" },
  ];
  private delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  async getAccount(id: string): Promise<Account> {
    await this.delay(500);
    const account = this.accounts.find((acc) => acc.id === id);
    if (!account) throw new Error("Conta não encontrada");
    return { ...account };
  }

  async updateBalance(id: string, newBalance: number): Promise<void> {
    await this.delay(500);
    const index = this.accounts.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      this.accounts[index].balance = newBalance;
      // console.log(`[DB Mock] Novo saldo da conta ${id}: R$ ${newBalance}`);
    }
  }
}
