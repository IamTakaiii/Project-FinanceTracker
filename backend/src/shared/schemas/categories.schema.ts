import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { user } from "./auth.schema";

export const categoryGroupEnum = pgEnum("category_group", ["income", "expense"]);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  color: varchar("color", { length: 7 }).notNull(),
  group: varchar("group", { length: 50 }), // eg. "wallet", "income", "expense"
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
