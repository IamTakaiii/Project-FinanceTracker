import { WalletPage } from '@/features/wallets/components/wallet-page'
import { getWallets } from '@/features/wallets/wallet-api'
import type { GetWalletQuery } from '@/features/wallets/wallet-types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/wallets')({
  component: WalletPage,
  validateSearch: (s) => s as GetWalletQuery,
  loaderDeps: (d) => d,
  loader: async ({ deps }) => ({
    crumb: 'wallets',
    results: await getWallets(deps.search),
  }),
  beforeLoad: ({ location, context, cause }) => {
    console.log('Loading wallets route', {
      location,
      context,
      cause,
    });
  }
})

