import { ErrorPage } from '@/components/errors/error'
import { ErrorHandler } from '@/utils/errors'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/bib')({
  component: RouteComponent,
  loader: () => ({ crumb: "bib" }),
  onError: ErrorHandler,
  errorComponent: ErrorPage,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/bib"!</div>
}
