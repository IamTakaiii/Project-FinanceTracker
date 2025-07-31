import api from "@/global/utils/axios"
import type { GetWalletQuery, GetListWalletResponse, Wallet } from "./wallet-types"

export const getWallets = async (query: GetWalletQuery) => {
    const response = await api.get<GetListWalletResponse>("/api/v1/wallets", {
        params: query
    })
    return response.data
}

export const getWalletById = async ({ id }: { id: string }) => {
  const response = await api.get<Wallet>(`/api/v1/wallets/${id}`);
  return response.data;
};