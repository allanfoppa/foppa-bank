export interface IDepositMoneyUseCase {
  execute(accountId: string, amount: number): Promise<void>;
}
