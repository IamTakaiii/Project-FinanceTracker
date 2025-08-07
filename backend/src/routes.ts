import Elysia from "elysia";

import { currencyRoutes } from "./features/currencies/currency.routes";
import { walletRoutes } from "./features/wallets/wallet.routes";

const routes = new Elysia({ prefix: "api/v1" }).use(walletRoutes).use(currencyRoutes);

export { routes as AppRoutes };
