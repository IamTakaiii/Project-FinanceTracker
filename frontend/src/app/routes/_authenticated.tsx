import DefaultLayout from "@/global/components/layout/default-layout";
import { useAuthStore } from "@/global/stores/auth-store";
import { ErrorHandler } from "@/global/utils/errors";
import { createFileRoute, redirect } from "@tanstack/react-router";

const beforeLoadHandler = () => {
	const { token } = useAuthStore.getState();

	if (!token) {
		ErrorHandler(new Error("Please login before accessing this page."));
		throw redirect({ to: "/login" });
	}
};

export const Route = createFileRoute("/_authenticated")({
	component: DefaultLayout,
	beforeLoad: beforeLoadHandler,
	loader: () => ({ crumb: null }),
});
