export interface IConvertBalanceUseCase {
  execute(amountInBrl: number, targetCurrency: string): Promise<number>;
}
