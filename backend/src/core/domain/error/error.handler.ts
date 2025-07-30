import Elysia from "elysia";

import { GenerateResponse } from "../utils/response.util";
import { BadRequestError, InvalidSessionError, UnauthorizedError } from "./error.class";

export const errorHandler = (app: Elysia) => {
  app.error({ UnauthorizedError, BadRequestError }).onError(({ error, code, set }) => {
    const response = GenerateResponse;

    if (error instanceof UnauthorizedError && set) {
      set.status = 403;
    } else if (error instanceof BadRequestError && set) {
      set.status = 400;
    } else if (error instanceof InvalidSessionError && set) {
      set.status = 401;
    }

    return response.withError(error, code);
  });

  return app;
};
