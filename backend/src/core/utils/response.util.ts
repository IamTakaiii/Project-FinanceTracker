import { ResponseParams } from "../types";

export class GenerateResponse {
  static withoutData(message: string = "", status = true): ResponseParams<null> {
    return {
      status,
      message: message || "Operation successful",
      data: null,
    };
  }

  static withData<T>(data: T, message = "Success", status = true): ResponseParams<T> {
    return {
      status,
      message,
      data,
    };
  }

  static withError<T>(error: unknown, code?: string): ResponseParams<T> {
    let message = "An Unexpected error occurred";
    if (error instanceof Error) {
      message = error.message;
    } else if (Array.isArray(error)) {
      message = error.join(", ");
    } else if (typeof error === "string") {
      message = error;
    }
    return {
      status: false,
      code: code,
      message: message,
    };
  }
}
