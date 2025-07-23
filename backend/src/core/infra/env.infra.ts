import env from "env-var";

const NODE_ENV_ENUM = ["production", "test", "development"];

export const ENV = {
  NODE_ENV: env.get("NODE_ENV").required().asEnum(NODE_ENV_ENUM),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
};
