export type ResponseParams<T> = {
  status: boolean;
  data?: T;
  message: string;
  code?: string;
};
