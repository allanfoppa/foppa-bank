import { IExchangeRateService } from '../../../domain/ports/out/IExchangeRateService';
import { IConvertBalanceUseCase } from '../../ports/in/IConvertBalanceUseCase';

export class ConvertBalance implements IConvertBalanceUseCase {
  constructor(private exchangeService: IExchangeRateService) {}

  async execute(amountInBrl: number, targetCurrency: string): Promise<number> {
    if (targetCurrency === 'BRL') return amountInBrl;
    const rate = await this.exchangeService.getRate('BRL', targetCurrency);
    return amountInBrl * rate;
  }
}
