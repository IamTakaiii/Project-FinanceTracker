import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../../core/infra/schema/all.schema";

export class WalletRepository {
  constructor(private db: NodePgDatabase<typeof schema>) {}

  public async get(userId: string) {
    // Logic to fetch wallets for a user`
  }

  public async create(walletData: any) {
    // Logic to create a new wallet
  }

  public async update(walletId: string, walletData: any) {
    // Logic to update an existing wallet
  }

  public async delete(walletId: string) {
    const wallet = await this.db.delete(schema.wallets).where(eq(schema.wallets.id, walletId)).returning();
    return wallet;
  }

  public async getById(walletId: string) {
    const wallet = await this.db.select().from(schema.wallets).where(eq(schema.wallets.id, walletId)).execute();
    return wallet;
  }
}
