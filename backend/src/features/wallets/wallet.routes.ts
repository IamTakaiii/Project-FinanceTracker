import Elysia from "elysia";

import { db } from "../../core/infra/db.infra";
import { BetterAuthPlugin } from "../../core/lib/auth";
import { GenerateResponse } from "../../core/utils/response.util";
import { walletModel } from "./wallet.dto";
import { WalletRepository } from "./wallet.repo";
import { WalletService } from "./wallet.service";

export const walletRoutes = new Elysia({ prefix: "/wallets" })
  .use(BetterAuthPlugin)
  .use(walletModel)
  .decorate("response", GenerateResponse)
  .decorate("walletService", new WalletService(new WalletRepository(db)))
  .post(
    "/",
    async ({ body, user, walletService, response }) => {
      try {
        await walletService.createWallet(user.id, body);
        return response.withoutData();
      } catch (error) {
        const code = "WALLET_CREATE_ERROR";
        return response.withError(error, code);
      }
    },
    {
      auth: true,
      body: "wallet.create",
      response: "wallet.create.response",
    },
  );
