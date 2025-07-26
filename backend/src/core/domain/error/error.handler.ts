import { ErrorCode } from "../../types";
import { GenerateResponse } from "../utils/response.util";

export const errorHandler = (error: unknown, code: ErrorCode) => {
  const response = GenerateResponse;

  if (error instanceof Error) {
    return response.withError(error, code);
  }

  return response.withError("An unexpected error occurred", code);
};
