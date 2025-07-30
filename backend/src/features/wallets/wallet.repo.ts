import { and, asc, desc, eq, gt, lt, or, SQL } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../../core/infra/schema/all.schema";
import { CreateWallet, UpdateWallet, WalletCursor, WalletQuery } from "./wallet.dto";

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

  public async update(userId: string, walletId: string, walletData: UpdateWallet) {
    const wallet = await this.db
      .update(schema.wallets)
      .set(walletData)
      .where(and(eq(schema.wallets.id, walletId), eq(schema.wallets.userId, userId)))
      .returning();

    return wallet;
  }

  public async delete(userId: string, walletId: string) {
    const wallet = await this.db
      .delete(schema.wallets)
      .where(and(eq(schema.wallets.id, walletId), eq(schema.wallets.userId, userId)))
      .returning();

    if (wallet.length === 0) {
      throw new Error("Wallet not found");
    }

    return wallet;
  }

  public async getById(userId: string, walletId: string) {
    const wallet = await this.db
      .select()
      .from(schema.wallets)
      .where(and(eq(schema.wallets.id, walletId), eq(schema.wallets.userId, userId)))
      .execute();
    return wallet;
  }

  public async get(userId: string, query: WalletQuery) {
    const sortBy = query.sortBy || "name";
    const sortOrder = query.sortOrder || "asc";
    const limit = query.limit;

    const orderFn = sortOrder === "asc" ? asc : desc;
    const comparisonFn = sortOrder === "asc" ? gt : lt;

    let cursor: any = null;
    if (query.cursor) {
      cursor = JSON.parse(Buffer.from(query.cursor, "base64").toString("ascii"));
    }

    let orderByClause: SQL[];
    let cursorWhereClause: SQL | undefined;

    switch (sortBy) {
      case "name":
      default:
        orderByClause = [orderFn(schema.wallets.name), orderFn(schema.wallets.id)];
        if (cursor) {
          cursorWhereClause = or(
            comparisonFn(schema.wallets.name, cursor.name),
            and(eq(schema.wallets.name, cursor.name), comparisonFn(schema.wallets.id, cursor.id)),
          );
        }
        break;
    }

    const whereConditions = [
      eq(schema.wallets.userId, userId),
      query.name ? eq(schema.wallets.name, query.name) : undefined,
      query.currency ? eq(schema.wallets.currency, query.currency) : undefined,
      cursorWhereClause,
    ];

    const wallets = await this.db.query.wallets.findMany({
      limit: limit,
      where: and(...whereConditions.filter(Boolean)),
      orderBy: orderByClause,
    });

    let nextCursor: string | null = null;
    if (wallets.length === limit) {
      const lastWallet = wallets[wallets.length - 1];
      let cursorPayload: WalletCursor;

      switch (sortBy) {
        case "name":
        default:
          cursorPayload = { name: lastWallet.name, id: lastWallet.id };
          break;
      }

      nextCursor = Buffer.from(JSON.stringify(cursorPayload)).toString("base64");
    }

    return {
      wallets,
      nextCursor,
    };
  }
}
