import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const currencies = pgTable("currencies", {
  id: text("id").primaryKey(),
  label: varchar("label", { length: 50 }).notNull(),
  value: varchar("value", { length: 10 }).notNull(),
  icon: varchar("icon", { length: 100 }),
});
