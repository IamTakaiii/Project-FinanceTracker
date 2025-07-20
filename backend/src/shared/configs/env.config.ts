import env from "env-var";

export const ENV = {
  NODE_ENV: env.get("NODE_ENV").default("development").asEnum(["production", "test", "development"]),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
};
