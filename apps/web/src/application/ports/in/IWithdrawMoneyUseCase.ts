export interface IWithdrawMoneyUseCase {
  execute(accountId: string, amount: number): Promise<void>;
}
