export type Wallet = {
  id: string;
  name: string;
  currency: string;
  initial_balance: string;
  balance: string;
  icon: string | null;
}

export type GetWalletQuery = {
    name?: string;
    currency?: string;
    limit?: number;
    cursor?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export type GetListWalletResponse = {
  data: Wallet[];
  cursor: string | null;
}