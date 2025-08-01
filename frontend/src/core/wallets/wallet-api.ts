import api from "@/global/utils/axios"
import type { GetWalletQuery, GetListWalletResponse, Wallet } from "./wallet-types"

const baseURL = "/api/v1/wallets";

export const getWallets = async (query: GetWalletQuery) => {
    const response = await api.get<GetListWalletResponse>(baseURL, {
        params: query
    })
    return response.data
}

export const getWalletById = async ({ id }: { id: string }) => {
  const response = await api.get<Wallet>(`${baseURL}/${id}`);
  return response.data;
};

export const createWallet = async (wallet: Omit<Wallet, "id">) => {
  return await api.post<Wallet>(baseURL, wallet);
};