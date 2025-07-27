import { ErrorPage } from "@/components/errors/error";
import { ErrorHandler } from "@/utils/errors";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: RouteComponent,
	loader: () => ({ crumb: "Dashboard" }),
	onError: ErrorHandler,
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
