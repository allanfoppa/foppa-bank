import { IExchangeRateService } from "../../../domain/ports/out/IExchangeRateService";

export class ApiExchangeRateService implements IExchangeRateService {
  private readonly API_URL = "https://api.exchangerate-api.com/v4/latest/";

  async getRate(from: string, to: string): Promise<number> {
    try {
      const response = await fetch(`${this.API_URL}${from}`);
      const data = await response.json();
      const rate = data.rates[to];
      if (!rate) throw new Error("Moeda não suportada");
      return rate;
    } catch (error) {
      console.error("Falha ao buscar câmbio, usando taxa padrão.");
      return 0.2;
    }
  }
}
