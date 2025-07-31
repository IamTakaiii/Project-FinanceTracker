import { ErrorPage } from "@/global/components/errors/error";
import { SingleFormLayout } from "@/global/components/layout/form-layout";
import { BG_IMG_URL } from "@/global/config/constants";
import { RegisterForm } from "@/core/authen/components/register-form";
import { ErrorHandler } from "@/global/utils/errors";
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
