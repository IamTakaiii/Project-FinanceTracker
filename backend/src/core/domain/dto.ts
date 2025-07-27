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
    code: Type.Optional(Type.String()),
    data: Type.Array(schema),
    pagination: Type.Object({
      total: Type.Number(),
      limit: Type.Number(),
      offset: Type.Number(),
    }),
    message: Type.String(),
  });
