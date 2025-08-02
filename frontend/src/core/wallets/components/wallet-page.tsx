import { WalletDialog } from "./wallet-dialog";
import { Button } from "@/global/components/ui/button";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import WalletCard from "./wallet-card";
import { useGetWallets } from "../wallet-hook";

export const WalletPage = () => {
  const { initialWallets, ts } = useLoaderData({ from: "/_authenticated/wallets" });
  const search = useSearch({ from: "/_authenticated/wallets" });
  const wallets = useGetWallets(search, initialWallets, ts);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wallets</h1>
          <p className="text-muted-foreground">
            Manage your wallets in your account.
          </p>
        </div>
        <WalletDialog mode="create">
          <Button size={"sm"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Wallet
          </Button>
        </WalletDialog>
      </div>
      {/* Wallets list will be rendered here */}
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
          wallets.data.data.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))
        }
      </div>
    </>
  );
};
