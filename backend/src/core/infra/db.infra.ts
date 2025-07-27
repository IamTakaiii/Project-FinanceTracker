import { drizzle } from "drizzle-orm/node-postgres";
import env from "env-var";
import { Client } from "pg";

import * as schema from "./schema/all.schema";

export const client = new Client({
  connectionString: env.get("DATABASE_URL").required().asString(),
  keepAlive: true,
  idle_in_transaction_session_timeout: 10000, // 10 seconds
  connectionTimeoutMillis: 5000, // 5 seconds
});

export const db = drizzle({
  client,
  casing: "snake_case",
  schema: schema,
});
