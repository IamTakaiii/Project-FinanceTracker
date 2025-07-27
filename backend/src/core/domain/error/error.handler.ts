import Elysia from "elysia";

import { GenerateResponse } from "../utils/response.util";
import { BadRequestError, UnauthorizedError } from "./error.class";

export const errorHandler = (app: Elysia) => {
  app.error({ UnauthorizedError, BadRequestError }).onError(({ error, code, set }) => {
    let errorMessage = "An unexpected error occurred";

    const response = GenerateResponse;

    if (error instanceof UnauthorizedError && set) {
      set.status = 401;
      errorMessage = error.message;
    } else if (error instanceof BadRequestError && set) {
      set.status = 400;
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return response.withError(errorMessage, code);
  });

  return app;
};
