import { ErrorPage } from '@/components/errors/error'
import { useGetWallets } from '@/features/wallets/wallet-hooks'
import { ErrorHandler } from '@/utils/errors'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/bob')({
    component: RouteComponent,
    loader: () => ({ crumb: "bob" }),
    onError: ErrorHandler,
    errorComponent: ErrorPage,
})

const EMPTY_WALLET_OPTIONS = {};


function RouteComponent() {
  const { data, loading, error, hasNextPage, loadMore } = useGetWallets(EMPTY_WALLET_OPTIONS);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>bo {data.map(wallet => <div key={wallet.id}>{wallet.name}</div>)}</div>
}
