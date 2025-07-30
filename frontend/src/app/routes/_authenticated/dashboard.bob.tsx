import { ErrorPage } from '@/components/errors/error'
import { useGetWallets } from '@/features/wallets/wallet-hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/bob')({
    component: RouteComponent,
    loader: () => ({ crumb: "bob" }),
    errorComponent: ErrorPage,
})

const EMPTY_WALLET_OPTIONS = {};


function RouteComponent() {
  const { data  } = useGetWallets(EMPTY_WALLET_OPTIONS);
  return <div>bo {data.map(wallet => <div key={wallet.id}>{wallet.name}</div>)}</div>
}
