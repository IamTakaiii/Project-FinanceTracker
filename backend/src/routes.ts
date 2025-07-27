import Elysia from "elysia";

import { walletRoutes } from "./features/wallets/wallet.routes";

const routes = new Elysia({ prefix: "api/v1" }).use(walletRoutes);

export { routes as AppRoutes };
