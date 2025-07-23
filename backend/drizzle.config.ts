import type { Config } from "drizzle-kit";
import env from "env-var";

export default {
  schema: "./src/core/infra/schema",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: env.get("DATABASE_URL").required().asString(),
  },
} satisfies Config;
