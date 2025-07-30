export type ResponseParams<T> = {
  status: boolean;
  data: T;
  message: string;
  code?: ErrorCode;
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  cursor?: string | null;
};

export type ErrorCode =
  | "UNKNOWN"
  | "VALIDATION"
  | "NOT_FOUND"
  | "PARSE"
  | "INTERNAL_SERVER_ERROR"
  | "INVALID_COOKIE_SIGNATURE"
  | "INVALID_FILE_TYPE"
  | number
  | string;
