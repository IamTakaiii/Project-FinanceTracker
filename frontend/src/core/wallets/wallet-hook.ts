import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createWallet,
  deleteWallet,
  getWallets,
  updateWallet,
} from "./wallet-api";
import type {
  GetListWalletResponse,
  GetWalletQuery,
  Wallet,
} from "./wallet-types";
import { toast } from "sonner";
import { ErrorHandler } from "@/global/utils/errors";

export const useCreateWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (walletData: Omit<Wallet, "id">) => {
      return await createWallet(walletData);
    },
    onSuccess: async () => {
      toast.success("Wallet created successfully");
      queryClient.refetchQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      ErrorHandler(error);
    },
  });
};

export const useUpdateWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wallet: Wallet) => {
      return await updateWallet(wallet);
    },
    onSuccess: () => {
      toast.success("Wallet updated successfully");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      ErrorHandler(error);
    },
  });
};

export const useDeleteWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (walletId: string) => {
      return await deleteWallet(walletId);
    },
    onSuccess: () => {
      toast.success("Wallet deleted successfully");
      queryClient.refetchQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      ErrorHandler(error);
    },
  });
};

export const useGetWallets = (
  search: GetWalletQuery,
  initialData: GetListWalletResponse,
  ts: number
) => {
  return useInfiniteQuery({
    queryKey: ["wallets", search],
    queryFn: ({ pageParam }) => getWallets({ ...search, cursor: pageParam }),
    initialData: {
      pages: [initialData],
      pageParams: [""],
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor || undefined,
    staleTime: 1000 * 60 * 60,
    initialDataUpdatedAt: ts,
  });
};
