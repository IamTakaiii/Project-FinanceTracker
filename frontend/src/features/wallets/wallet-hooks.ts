import { usePaginatedQuery } from "@/hooks/use-paginated-query ";
import type { GetWalletQuery, Wallet } from "./wallet-types";
import { getWalletById, getWallets } from "./wallet-api";
import { useQuery } from "@/hooks/use-query";

export const useGetWallets = (queryOptions: Omit<GetWalletQuery, "cursor">) => {
  return usePaginatedQuery<Wallet, GetWalletQuery>({
    queryKey: "wallets",
    queryFn: getWallets,
    queryOptions,
    pagination: { mode: "cursor" },
  });
};

export const useGetWalletById = (id: string, enabled: boolean = true) => {
  return useQuery<Wallet, { id: string }>({
    queryKey: `wallet-${id}`,
    queryFn: getWalletById,
    variables: { id },
    enabled,
  });
};

