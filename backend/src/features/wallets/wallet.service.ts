import { NotFoundError } from "elysia";

import { BadRequestError } from "../../core/domain/error/error.class";
import { gemini, geminiConfigs } from "../../core/infra/gemini.infra";
import { CreateWallet, UpdateWallet, Wallet, WalletQuery } from "./wallet.dto";
import { WalletRepository } from "./wallet.repo";

export class WalletService {
  private readonly walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  public async createWallet(userId: string, walletData: CreateWallet) {
    const { wallets } = await this.walletRepository.findWithCursor(userId, {
      name: walletData.name,
    });
    if (wallets.length > 0) {
      throw new BadRequestError(`Wallet name "${walletData.name}" already exists`);
    }
    return this.walletRepository.create(userId, walletData);
  }

  public async updateWallet(userId: string, walletId: string, walletData: UpdateWallet) {
    return this.walletRepository.update(userId, walletId, walletData);
  }

  public async deleteWallet(userId: string, walletId: string) {
    return this.walletRepository.delete(userId, walletId);
  }

  public async getWallets(userId: string, query: WalletQuery) {
    return this.walletRepository.findWithCursor(userId, query);
  }

  public async getWalletById(userId: string, walletId: string) {
    const wallet = await this.walletRepository.findById(userId, walletId);
    if (wallet.length === 0) throw new NotFoundError("Wallet not found");
    return wallet[0];
  }

  public async getTotalBalance(userId: string) {
    const wallets = await this.walletRepository.findAllByUserId(userId);
    if (wallets.length === 0) return "0.00";
    const totalBalance = await this.calculateTotalBalanceInBaseCurrency(wallets);
    return totalBalance.toFixed(2);
  }

  private async convertedTotalFromAI(
    balances: Record<string, number>,
    baseCurrency: string,
  ): Promise<number> {
    if (Object.keys(balances).length === 0) {
      return 0;
    }

    if (Object.keys(balances).length === 1 && balances[baseCurrency]) {
      return balances[baseCurrency];
    }

    const promptLines = [
      `Convert the following amounts to a single total in ${baseCurrency}.`,
      ...Object.entries(balances).map(([currency, total]) => `${total.toFixed(2)} ${currency}`),
    ];

    const prompt =
      promptLines.join("\n") +
      `\n\nReturn only the final numeric total in ${baseCurrency}, don't explain.
      `;

    const aiResponse = await gemini.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
      config: geminiConfigs,
    });

    return this.parseAINumericResponse(aiResponse.text);
  }

  private parseAINumericResponse(responseText: string | undefined): number {
    if (!responseText) {
      throw new Error("AI response was empty.");
    }

    const match = responseText.match(/[\d,]+(\.\d+)?/);

    if (match && match[0]) {
      const numericString = match[0].replace(/,/g, "");
      const number = parseFloat(numericString);
      if (!isNaN(number)) return number;
    }

    throw new Error(`Failed to parse a valid number from AI response: "${responseText}"`);
  }

  private async calculateTotalBalanceInBaseCurrency(
    wallets: Wallet[],
    baseCurrency = "USD",
  ): Promise<number> {
    const sumOfBalancesByCurrency = wallets.reduce(
      (acc, wallet) => {
        const balance = parseFloat(wallet.balance);
        if (!isNaN(balance)) {
          acc[wallet.currency] = (acc[wallet.currency] || 0) + balance;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalBaseCurrency = await this.convertedTotalFromAI(
      sumOfBalancesByCurrency,
      baseCurrency,
    );
    return totalBaseCurrency;
  }
}
