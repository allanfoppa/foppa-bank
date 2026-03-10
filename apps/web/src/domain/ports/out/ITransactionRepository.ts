import { Transaction } from '../../entities/Transaction';

export interface ITransactionRepository {
  getAccountHistory(accountId: string): Promise<Transaction[]>;
  getDailySpent(accountId: string, date: string): Promise<number>;
  save(transaction: Transaction): Promise<void>;
}
