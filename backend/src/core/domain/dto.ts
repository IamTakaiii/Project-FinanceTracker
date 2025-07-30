import { type TSchema } from "@sinclair/typebox";
import { t as Type } from "elysia";

export const ErrorCodeSchema = Type.Union([Type.String(), Type.Number()]);

export const ResponseWithoutData = Type.Object({
  status: Type.Boolean(),
  message: Type.String(),
});

export const Response = <T extends TSchema>(schema: T) =>
  Type.Object({
    status: Type.Boolean(),
    code: Type.Optional(ErrorCodeSchema),
    data: schema,
    message: Type.String(),
  });

export const ResponseWithPagination = <T extends TSchema>(schema: T) =>
  Type.Object({
    status: Type.Boolean(),
    code: Type.Optional(ErrorCodeSchema),
    data: Type.Array(schema),
    pagination: Type.Optional(
      Type.Object({
        total: Type.Optional(Type.Number()),
        limit: Type.Optional(Type.Number()),
        offset: Type.Optional(Type.Number()),
      }),
    ),
    message: Type.String(),
  });

export const ResponseWithCursor = <T extends TSchema>(schema: T) =>
  Type.Object({
    status: Type.Boolean(),
    code: Type.Optional(ErrorCodeSchema),
    data: schema,
    cursor: Type.Optional(Type.Nullable(Type.String({ pattern: "^[A-Za-z0-9+/=]+$" }))),
    message: Type.String(),
  });
