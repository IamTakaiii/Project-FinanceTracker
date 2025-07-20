import { ErrorPage } from "@/components/errors/error";
import { SingleFormLayout } from "@/components/layout/form-layout";
import { LoginForm } from "@/features/authen/components/login-form";
import { ErrorHandler } from "@/utils/errors";
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
