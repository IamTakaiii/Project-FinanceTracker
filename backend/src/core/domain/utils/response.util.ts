import { ResponseParams } from "../../types";

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

  static withPagination<T>(data: T, total: number, page: number, limit: number): ResponseParams<T> {
    return {
      status: true,
      message: "Data retrieved successfully",
      data,
      pagination: {
        total,
        page,
        limit,
      },
    };
  }

  static withError<T>(error: unknown, code?: any): ResponseParams<T> {
    let message = "An Unexpected error occurred";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      status: false,
      code: code,
      message: message,
      data: null as unknown as T,
    };
  }

  static withCursor<T>(
    data: T,
    cursor: string | null,
    message = "Success",
    status = true,
  ): ResponseParams<T> {
    return {
      status,
      message,
      data,
      cursor: cursor || null,
    };
  }
}
