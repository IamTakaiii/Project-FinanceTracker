import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWallet } from "./wallet-api";
import type { Wallet } from "./wallet-types";

export const useCreateWallet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (walletData: Omit<Wallet, "id">) => {
            return await createWallet(walletData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallets"] });
        },
        onError: (error) => {
            console.error("Error creating wallet:", error);
        },
    });
}
