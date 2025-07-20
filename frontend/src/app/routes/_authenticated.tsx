import DefaultLayout from "@/components/layout/default-layout";
import { AuthStore } from "@/stores/auth";
import { ErrorHandler } from "@/utils/errors";
import { createFileRoute, redirect } from "@tanstack/react-router";

const beforeLoadHandler = () => {
	const { isAuthenticated } = AuthStore.getState();

	if (!isAuthenticated) {
		ErrorHandler(new Error("Please login before accessing this page."));
		throw redirect({ to: "/login" });
	}
};

export const Route = createFileRoute("/_authenticated")({
	component: DefaultLayout,
	beforeLoad: beforeLoadHandler,
	loader: () => ({ crumb: null }),
});
