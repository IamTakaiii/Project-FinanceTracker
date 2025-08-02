import { decimal, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth.schema";

export const wallets = pgTable("wallets", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  initial_balance: decimal("initial_balance", {
    precision: 10,
    scale: 2,
  })
    .default("0.00")
    .notNull(),
  balance: decimal("balance", {
    precision: 10,
    scale: 2,
  })
    .default("0.00")
    .notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
