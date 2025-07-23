import { drizzle } from "drizzle-orm/node-postgres";
import env from "env-var";
import { Client } from "pg";

import * as authSchema from "./schema/auth.schema";
import * as budgetSchema from "./schema/budgets.schema";
import * as categorySchema from "./schema/categories.schema";
import * as transactionSchema from "./schema/transactions.schema";
import * as walletSchema from "./schema/wallets.schema";

export const client = new Client({
  connectionString: env.get("DATABASE_URL").required().asString(),
  keepAlive: true,
});

export const db = drizzle({
  client,
  casing: "snake_case",
  schema: {
    ...authSchema,
    ...budgetSchema,
    ...categorySchema,
    ...transactionSchema,
    ...walletSchema,
  },
});
