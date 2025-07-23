import { numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { categories } from "./categories.schema";
import { wallets } from "./wallets.schema";

export const transactionTypeEnum = pgEnum("transaction_type", ["income", "expense"]);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
  walletId: text("wallet_id")
    .notNull()
    .references(() => wallets.id, { onDelete: "cascade" }),
});
