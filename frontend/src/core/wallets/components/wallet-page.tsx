import { WalletDialog } from "./wallet-dialog";
import { Button } from "@/global/components/ui/button";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import WalletCard from "./wallet-card";
import { useGetWallets, useGetWalletsTotalBalance } from "../wallet-hook";
import {
  CardSkeleton,
  DataRenderer,
  NoDataEmptyState,
} from "@/global/components/custom/data-renderer";
import { useEffect, useMemo } from "react";
import { useInView } from "@/global/hooks/use-view";
import WalletTotal from "./wallet-total";

export const WalletPage = () => {
  const { initialWallets, ts } = useLoaderData({
    from: "/_authenticated/wallets",
  });

  const search = useSearch({ from: "/_authenticated/wallets" });

  const {
    data: { pages },
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetWallets(search, initialWallets, ts);

  const {
    data: {
      data: { totalBalance, baseCurrency },
    },
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
  } = useGetWalletsTotalBalance("Loading....", ts);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const wallets = useMemo(() => pages.flatMap((page) => page.data), [pages]);

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

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletTotal
          totalBalance={totalBalance}
          baseCurrency={baseCurrency}
          isLoading={isLoadingTotal}
          isFetching={isFetchingTotal}
        />
        <DataRenderer
          isLoading={isLoading}
          isFetching={isFetching}
          data={wallets}
          render={(wallet) => <WalletCard key={wallet.id} wallet={wallet} />}
          skeleton={<CardSkeleton />}
          emptyState={
            <div className="sm:col-span-2 lg:col-span-3 flex flex-1 items-center justify-center h-96">
              <NoDataEmptyState />
            </div>
          }
        />
        <div ref={ref}>{isFetchingNextPage && <CardSkeleton />}</div>
      </div>
    </>
  );
};
