import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    createWallet,
    deleteWallet,
    getTotalWalletBalance,
    getWallets,
    updateWallet,
} from "./wallet-api";
import type {
    GetListWalletResponse,
    GetTotalBalanceResponse,
    GetWalletQuery,
    Wallet,
} from "./wallet-types";
import {toast} from "sonner";
import {ErrorHandler} from "@/global/utils/errors";
import {QUERY_KEY_WALLETS, QUERY_KEY_WALLETS_TOTAL_BALANCE} from "@/global/config/constants";

export const useCreateWallet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (walletData: Omit<Wallet, "id">) => {
            return await createWallet(walletData);
        },
        onSuccess: async () => {
            toast.success("Wallet created successfully");
            await queryClient.refetchQueries({queryKey: [QUERY_KEY_WALLETS]});
            await queryClient.invalidateQueries({queryKey: [QUERY_KEY_WALLETS_TOTAL_BALANCE]});
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
        onSuccess: async () => {
            toast.success("Wallet updated successfully");
            await queryClient.invalidateQueries({queryKey: [QUERY_KEY_WALLETS]});
            await queryClient.invalidateQueries({queryKey: [QUERY_KEY_WALLETS_TOTAL_BALANCE]});
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
        onSuccess: async () => {
            toast.success("Wallet deleted successfully");
            await queryClient.refetchQueries({queryKey: [QUERY_KEY_WALLETS]});
            await queryClient.invalidateQueries({queryKey: [QUERY_KEY_WALLETS_TOTAL_BALANCE]});
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
        queryKey: [QUERY_KEY_WALLETS],
        queryFn: ({pageParam}) => getWallets({...search, cursor: pageParam}),
        initialData: {
            pages: [initialData],
            pageParams: [""],
        },
        initialPageParam: "",
        getNextPageParam: (lastPage) => lastPage.cursor || undefined,
        staleTime: 5 * 60 * 1000,
        initialDataUpdatedAt: ts,

    });
};


export const useGetWalletsTotalBalance = (initialBalance: string | null, ts: number) => {
    return useQuery<GetTotalBalanceResponse>({
        queryKey: [QUERY_KEY_WALLETS_TOTAL_BALANCE],
        queryFn: () => getTotalWalletBalance(),
        initialData: {
            data: {
                totalBalance: initialBalance || "0.00",
                baseCurrency: 'USD',
            },
        },
        initialDataUpdatedAt: ts,
        refetchOnWindowFocus: false,
    })
}