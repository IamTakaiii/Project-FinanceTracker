import Elysia, { t } from "elysia";

import { Response, ResponseWithCursor, ResponseWithoutData } from "../../core/domain/dto";

const walletParamsSchema = t.Object({
  id: t.String(),
});

const walletQuerySchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  currency: t.Optional(t.String({ length: 3 })),
  limit: t.Optional(t.Number({ default: 20, minimum: 20, maximum: 100 })),
  cursor: t.Optional(t.String()),
  sortBy: t.Optional(t.Union([t.Literal("name")])),
  sortOrder: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
});

const walletCursorSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  id: t.String(),
});

const createWalletSchema = t.Object({
  name: t.String({ maxLength: 100 }),
  initial_balance: t.String({ pattern: "^\\d+(\\.\\d{1,2})?$", default: "0.00" }),
  currency: t.String({ length: 3 }),
});

const updateWalletSchema = t.Object({
  name: t.Optional(t.String({ maxLength: 100 })),
  initial_balance: t.Optional(t.String({ pattern: "^\\d+(\\.\\d{1,2})?$" })),
  balance: t.Optional(t.String({ pattern: "^\\d+(\\.\\d{1,2})?$" })),
  currency: t.Optional(t.String({ length: 3 })),
});

const walletSchema = t.Object({
  id: t.String(),
  name: t.String({ maxLength: 100 }),
  initial_balance: t.String(),
  balance: t.String(),
  currency: t.String({ length: 3 }),
  userId: t.String(),
});
const walletResponseSchema = Response(walletSchema);
const walletPaginationResponseSchema = ResponseWithCursor(t.Array(walletSchema));

const walletTotalResponseSchema = Response(
  t.Object({
    totalBalance: t.String(),
    baseCurrency: t.String({ length: 3 }),
  }),
);

export type CreateWallet = typeof createWalletSchema.static;
export type UpdateWallet = typeof updateWalletSchema.static;
export type WalletParams = typeof walletParamsSchema.static;
export type WalletQuery = typeof walletQuerySchema.static;
export type WalletCursor = typeof walletCursorSchema.static;
export type Wallet = typeof walletSchema.static;

export const walletModel = new Elysia().model({
  "wallet.create": createWalletSchema,
  "wallet.update": updateWalletSchema,
  "wallet.params": walletParamsSchema,
  "wallet.query": walletQuerySchema,
  "wallet.create.response": ResponseWithoutData,
  "wallet.id.response": walletResponseSchema,
  "wallet.pagination.response": walletPaginationResponseSchema,
  "wallet.total.response": walletTotalResponseSchema,
});
