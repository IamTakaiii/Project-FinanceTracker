import { drizzle } from "drizzle-orm/node-postgres";
import env from "env-var";
import { Client } from "pg";

import * as schema from "./schema/all.schema";

export const client = new Client({
  connectionString: env.get("DATABASE_URL").required().asString(),
  keepAlive: true,
});

export const db = drizzle({
  client,
  casing: "snake_case",
  schema: schema,
});
