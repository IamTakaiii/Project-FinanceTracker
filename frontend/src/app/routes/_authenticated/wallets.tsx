import { WalletPage } from '@/core/wallets/components/wallet-page'
import { getWallets } from '@/core/wallets/wallet-api'
import type { GetWalletQuery } from '@/core/wallets/wallet-types'
import { ErrorPage } from '@/global/components/errors/error'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/wallets')({
  component: WalletPage,
  errorComponent: ErrorPage,
  validateSearch: (s) => s as GetWalletQuery,
  loaderDeps: (d) => d,
  loader: async ({ deps }) => ({
    crumb: 'Wallets',
    results: await getWallets(deps.search),
  }),
})

