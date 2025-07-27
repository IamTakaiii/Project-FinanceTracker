import Elysia, { t } from "elysia";

import { Response, ResponseWithoutData } from "../../core/domain/dto";

const createWalletSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  initial_balance: t.String({ pattern: "^\\d+(\\.\\d{1,2})?$" }),
  currency: t.String({ length: 3 }),
});

const updateWalletSchema = t.Partial(createWalletSchema);

const walletParamsSchema = t.Object({
  id: t.String(),
});

const walletQuerySchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  currency: t.Optional(t.String({ length: 3 })),
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
  offset: t.Optional(t.Number({ minimum: 0 })),
});

const walletResponseSchema = Response(
  t.Object({
    id: t.String(),
    name: t.String({ maxLength: 100 }),
    initial_balance: t.String({ pattern: "^\\d+(\\.\\d{1,2})?$" }),
    currency: t.String({ length: 3 }),
    userId: t.String(),
  }),
);

export type CreateWallet = typeof createWalletSchema.static;
export type UpdateWallet = typeof updateWalletSchema.static;
export type WalletParams = typeof walletParamsSchema.static;
export type WalletQuery = typeof walletQuerySchema.static;

export const walletModel = new Elysia().model({
  "wallet.create": createWalletSchema,
  "wallet.update": updateWalletSchema,
  "wallet.params": walletParamsSchema,
  "wallet.query": walletQuerySchema,
  "wallet.create.response": ResponseWithoutData,
  "wallet.id.response": walletResponseSchema,
});
