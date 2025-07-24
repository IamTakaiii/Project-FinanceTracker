import { and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../../core/infra/schema/all.schema";
import { CreateWallet, UpdateWallet, WalletQuery } from "./wallet.dto";

export class WalletRepository {
  private db: NodePgDatabase<typeof schema>;

  constructor(db: NodePgDatabase<typeof schema>) {
    this.db = db;
  }

  public async create(userId: string, walletData: CreateWallet) {
    await this.db
      .insert(schema.wallets)
      .values({
        id: crypto.randomUUID(),
        name: walletData.name,
        initial_balance: walletData.initial_balance.toString(),
        currency: walletData.currency,
        userId: userId,
      })
      .returning();
  }

  public async update(walletId: string, walletData: UpdateWallet) {
    const updateData: Partial<UpdateWallet> = {};

    if (walletData.name) {
      updateData.name = walletData.name;
    }

    const wallet = await this.db
      .update(schema.wallets)
      .set(updateData)
      .where(eq(schema.wallets.id, walletId))
      .returning();

    return wallet;
  }

  public async delete(walletId: string) {
    const wallet = await this.db
      .delete(schema.wallets)
      .where(eq(schema.wallets.id, walletId))
      .returning();

    if (wallet.length === 0) {
      throw new Error("Wallet not found");
    }

    return wallet;
  }

  public async get(userId: string, query: WalletQuery) {
    const wallets = await this.db.query.wallets.findMany({
      limit: query.limit,
      offset: query.offset,
      where: and(
        eq(schema.wallets.userId, userId),
        query.name ? eq(schema.wallets.name, query.name) : undefined,
        query.currency ? eq(schema.wallets.currency, query.currency) : undefined,
      ),
      orderBy: schema.wallets.name,
    });

    return wallets;
  }

  public async getById(userId: string, walletId: string) {
    const wallet = await this.db
      .select()
      .from(schema.wallets)
      .where(and(eq(schema.wallets.id, walletId), eq(schema.wallets.userId, userId)))
      .execute();

    if (wallet.length === 0) {
      throw new Error("Wallet not found");
    }

    return wallet;
  }
}
