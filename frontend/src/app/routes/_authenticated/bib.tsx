import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/bib')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/bib"!</div>
}
