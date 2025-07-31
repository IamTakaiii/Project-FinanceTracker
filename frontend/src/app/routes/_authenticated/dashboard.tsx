import { ErrorPage } from "@/global/components/errors/error";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: RouteComponent,
	loader: () => ({ crumb: "Dashboard" }),
	errorComponent: ErrorPage,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<Outlet />
		</div>
	);
}
