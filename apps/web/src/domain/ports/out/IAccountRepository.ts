import { Account } from "../../entities/Account";

export interface IAccountRepository {
  getAccount(id: string): Promise<Account>;
  updateBalance(id: string, newBalance: number): Promise<void>;
}
