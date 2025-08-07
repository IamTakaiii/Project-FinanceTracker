import { CurrencyRepository } from "./currency.repo";

export class CurrencyService {
  private readonly currencyRepository: CurrencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public async getCurrenciesByLabel(label: string) {
    const currency = await this.currencyRepository.findByLabel(label);
    return currency;
  }
}
