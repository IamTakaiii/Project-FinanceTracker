import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import logixlysia from "logixlysia";

import { db } from "./core/infra/db.infra";
import { swaggerConfig } from "./core/infra/swagger.infra";
import { BetterAuthPlugin } from "./core/lib/auth";
import { AppRoutes } from "./routes";

await db.$client.connect();

const app = new Elysia()
  .use(BetterAuthPlugin)
  .use(cors())
  .use(swagger(swaggerConfig))
  .use(helmet())
  .use(logixlysia())
  .use(AppRoutes);

app.listen(process.env.PORT || 3000);
