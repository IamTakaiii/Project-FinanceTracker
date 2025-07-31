import { WalletPage } from '@/core/wallets/components/wallet-page'
import { getWallets } from '@/core/wallets/wallet-api'
import type { GetWalletQuery } from '@/core/wallets/wallet-types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/wallets')({
  component: WalletPage,
  validateSearch: (s) => s as GetWalletQuery,
  loaderDeps: (d) => d,
  loader: async ({ deps }) => ({
    crumb: 'wallets',
    results: await getWallets(deps.search),
  }),
})

