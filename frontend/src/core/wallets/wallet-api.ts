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
  await api.post<Wallet>(baseURL, wallet);
  return;
};

export const updateWallet = async (wallet: Wallet) => {
  await api.put<Wallet>(`${baseURL}/${wallet.id}`, wallet);
  return;
}

export const deleteWallet = async (id: string) => {
  await api.delete(`${baseURL}/${id}`);
  return;
};
