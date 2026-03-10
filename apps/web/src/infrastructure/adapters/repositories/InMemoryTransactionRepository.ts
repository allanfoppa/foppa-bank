import { Transaction } from "../../../domain/entities/Transaction";
import { ITransactionRepository } from "../../../domain/ports/out/ITransactionRepository";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async getAccountHistory(accountId: string): Promise<Transaction[]> {
    return this.transactions.filter((t) => t.id === accountId);
  }

  async getDailySpent(accountId: string, date: string): Promise<number> {
    return this.transactions
      .filter(
        (t) => t.id === accountId && t.date === date && t.type === "EXPENSE",
      )
      .reduce((sum, t) => sum + t.value, 0);
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
