import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import logixlysia from "logixlysia";

import { AppRoutes } from "./app.routes";
import { db } from "./shared/configs/db.config";
import { swaggerConfig } from "./shared/configs/swagger.config";
import { BetterAuthPlugin } from "./shared/lib/auth";

await db.$client.connect();

const app = new Elysia()
  .use(BetterAuthPlugin)
  .use(cors())
  .use(swagger(swaggerConfig))
  .use(helmet())
  .use(logixlysia())
  .use(AppRoutes);

app.listen(process.env.PORT || 3000);
