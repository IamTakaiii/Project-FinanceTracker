import Elysia from "elysia";

import { GenerateResponse } from "../../core/domain/utils/response.util";
import { db } from "../../core/infra/db.infra";
import { BetterAuthPlugin } from "../../core/lib/auth";
import { currencyModel } from "./currency.dto";
import { CurrencyRepository } from "./currency.repo";
import { CurrencyService } from "./currency.service";

export const currencyRoutes = new Elysia({ prefix: "/currencies", name: "currency-routes" })
  .use(BetterAuthPlugin)
  .use(currencyModel)
  .decorate("response", GenerateResponse)
  .decorate("currencyService", new CurrencyService(new CurrencyRepository(db)))
  .get(
    "/",
    async ({ query, currencyService, response }) => {
      const currencies = await currencyService.getCurrenciesByLabel(query.search || "");
      return response.withData(currencies);
    },
    {
      query: "currency.query",
      response: "currency.dropdown.response",
    },
  );
