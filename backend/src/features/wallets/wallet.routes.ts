import Elysia from "elysia";

import { GenerateResponse } from "../../core/domain/utils/response.util";
import { db } from "../../core/infra/db.infra";
import { BetterAuthPlugin } from "../../core/lib/auth";
import { walletModel } from "./wallet.dto";
import { WalletRepository } from "./wallet.repo";
import { WalletService } from "./wallet.service";

export const walletRoutes = new Elysia({ prefix: "/wallets", name: "wallets-routes" })
  .use(BetterAuthPlugin)
  .use(walletModel)
  .decorate("response", GenerateResponse)
  .decorate("walletService", new WalletService(new WalletRepository(db)))
  .post(
    "/",
    async ({ body, user, walletService, response }) => {
      await walletService.createWallet(user.id, body);
      return response.withoutData();
    },
    {
      auth: true,
      body: "wallet.create",
      response: "wallet.create.response",
    },
  )
  .get(
    "/:id",
    async ({ user, params, walletService, response }) => {
      const wallet = await walletService.getWalletById(user.id, params.id);
      return response.withData(wallet);
    },
    {
      auth: true,
      params: "wallet.params",
      response: "wallet.id.response",
    },
  );
