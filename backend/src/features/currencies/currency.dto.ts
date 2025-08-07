import Elysia, { t } from "elysia";

import { Response } from "../../core/domain/dto";

const currencyQuerySchema = t.Object({
  search: t.Optional(t.String({ maxLength: 50 })),
});

const currencySchema = t.Object({
  id: t.String(),
  label: t.String({ maxLength: 50 }),
  value: t.String({ maxLength: 10 }),
  icon: t.Nullable(t.String({ maxLength: 100 })),
});
const currencyResponseSchema = Response(t.Array(currencySchema));

export type Currency = typeof currencySchema.static;

export const currencyModel = new Elysia().model({
  "currency.query": currencyQuerySchema,
  "currency.dropdown.response": currencyResponseSchema,
});
