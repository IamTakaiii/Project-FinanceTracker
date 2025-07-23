import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { categories } from "./categories.schema";
import { wallets } from "./wallets.schema";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(), // e.g., 'income', 'expense'
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  transaction_date: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  walletId: text("wallet_id")
    .notNull()
    .references(() => wallets.id, { onDelete: "cascade" }),
});
