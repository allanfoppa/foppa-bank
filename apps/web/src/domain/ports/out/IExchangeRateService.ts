export interface IExchangeRateService {
  getRate(from: string, to: string): Promise<number>;
}
