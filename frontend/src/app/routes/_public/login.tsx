import { ErrorPage } from "@/global/components/errors/error";
import { SingleFormLayout } from "@/global/components/layout/form-layout";
import { LoginForm } from "@/core/authen/components/login-form";
import { ErrorHandler } from "@/global/utils/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/login")({
	component: RouteComponent,
	onError: ErrorHandler,
	errorComponent: ErrorPage,
});

function RouteComponent() {
	return (
		<SingleFormLayout>
			<LoginForm />
		</SingleFormLayout>
	);
}
