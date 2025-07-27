import { NotFoundError } from "elysia";

import { CreateWallet, UpdateWallet, WalletQuery } from "./wallet.dto";
import { WalletRepository } from "./wallet.repo";

export class WalletService {
  private readonly walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  public async createWallet(userId: string, walletData: CreateWallet) {
    return this.walletRepository.create(userId, walletData);
  }

  public async updateWallet(userId: string, walletId: string, walletData: UpdateWallet) {
    return this.walletRepository.update(userId, walletId, walletData);
  }

  public async deleteWallet(userId: string, walletId: string) {
    return this.walletRepository.delete(userId, walletId);
  }

  public async getWallets(userId: string, query: WalletQuery) {
    return this.walletRepository.get(userId, query);
  }

  public async getWalletById(userId: string, walletId: string) {
    const wallet = await this.walletRepository.getById(userId, walletId);
    if (wallet.length === 0) throw new NotFoundError("Wallet not found");
    return wallet[0];
  }
}
