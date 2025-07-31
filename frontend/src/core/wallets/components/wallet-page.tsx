import { useLoaderData, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type Wallet } from "../wallet-types";

export const WalletPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const { navigate } = useRouter();
  const { cursor } = useSearch({ from: "/_authenticated/wallets" });
  const { results: { data, cursor: nextCursor } } = useLoaderData({ from: "/_authenticated/wallets" });

  useEffect(() => {
    if (!cursor) {
      setWallets(data);
      return;
    }

    setWallets((prevWallets) => {
      const existingIds = new Set(prevWallets.map((w) => w.id));
      const newUniqueWallets = data.filter((w) => !existingIds.has(w.id));
      return [...prevWallets, ...newUniqueWallets];
    });

  }, [cursor, data]);

  const handleLoadMore = () => {
    navigate({
      to: "/wallets",
      search: { cursor: nextCursor ?? undefined },
    });
  };

  const handleNavigateToWallet = (walletId: string) => {
    navigate({
      to: `/wallets/${walletId}`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Wallets</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleNavigateToWallet(wallet.id)}
          >
            <h2 className="text-xl font-semibold">{wallet.name}</h2>
          </div>
        ))}
      </div>

      {nextCursor && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};