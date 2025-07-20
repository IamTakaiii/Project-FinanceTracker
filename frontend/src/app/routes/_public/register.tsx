import { ErrorPage } from "@/components/errors/error";
import { SingleFormLayout } from "@/components/layout/form-layout";
import { BG_IMG_URL } from "@/config/constants";
import { RegisterForm } from "@/features/authen/components/register-form";
import { ErrorHandler } from "@/utils/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/register")({
	component: RouteComponent,
	onError: ErrorHandler,
	errorComponent: ErrorPage,
});

function RouteComponent() {
	return (
		<SingleFormLayout backgroundImg={BG_IMG_URL}>
			<RegisterForm />
		</SingleFormLayout>
	);
}
