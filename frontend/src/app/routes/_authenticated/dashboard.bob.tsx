import { ErrorPage } from "@/components/errors/error";
import { getWallets } from "@/features/wallets/wallet-api";
import type { GetWalletQuery, Wallet } from "@/features/wallets/wallet-types";
import { createFileRoute, useLoaderData, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/dashboard/bob")({
  validateSearch: (s) => s as GetWalletQuery,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => ({
    crumb: "bob",
    api: await getWallets(search),
  }),
  component: RouteComponent,
  errorComponent: ErrorPage,
});

function RouteComponent() {
  const search = useSearch({ from: '/_authenticated/dashboard/bob' });
  const { api } = useLoaderData({ from: "/_authenticated/dashboard/bob" });
  const [allWallets, setAllWallets] = useState<Wallet[]>([]);
  const router = useRouter();


  const { data, cursor } = api;

  useEffect(() => {
    if (!search.cursor) {
      setAllWallets(api.data);
    } else {
      setAllWallets((prevWallets) => {
          const existingIds = new Set(prevWallets.map(w => w.id));
          const newUniqueWallets = api.data.filter(w => !existingIds.has(w.id));
          return [...prevWallets, ...newUniqueWallets];
      });
    }
  }, [api.data, search.cursor]);


  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Wallets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allWallets.map((wallet) => (
            <div key={wallet.id} className="p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{wallet.name}</h2>
              <p>Currency: {wallet.currency}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          router.navigate({
            to: "/dashboard/bob",
            search: { cursor: cursor || undefined },

          });
        }}
        disabled={!cursor}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >Load More</button>
    </>
  );
}
