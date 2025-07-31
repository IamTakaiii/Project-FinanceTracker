import { cn } from "@/global/lib/utils";
import { Button } from "@/global/components/ui/button";
import { Card, CardContent } from "@/global/components/ui/card";
import { Spinner } from "@/global/components/ui/spinner";
import { FormField } from "@/global/components/ui/formfield";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { registerByEmail } from "@/core/authen/auth-api";
import { useNavigate } from "@tanstack/react-router";
import { ErrorHandler } from "@/global/utils/errors";

export const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	
	const form = useForm({
		mode: "uncontrolled",

		initialValues: {
			name: "",
			email: "",
			password: "",
		},

		validate: {
			name: (value) => (value.length >= 2 ? null : "Name is required and must be at least 2 characters long"),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters long"),
		},
	});

	const onSubmitRegister = async (values: { name: string; email: string; password: string }) => {
		try {
			setIsLoading(true);
			const registerData = await registerByEmail(values.name, values.email, values.password);
			if (registerData.error) {
				throw new Error(registerData.error.message);
			}
			if (registerData.data) {
				navigate({ to: "/login" });
			}
		} catch (error) {
			ErrorHandler(new Error( error instanceof Error ? error.message : "Unknown error"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0 shadow-sm border border-muted">
				<CardContent className="p-8 md:p-8">
					<div className="mb-10">
						<h1 className="text-2xl font-bold">Create Your Account</h1>
						<p className="text-muted-foreground">Please fill in the details below to create your account.</p>
					</div>

					<form onSubmit={form.onSubmit(onSubmitRegister)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								id="name"
								name="name"
								label="Name"
								type="text"
								placeholder="John Doe"
								required
								{...form.getInputProps("name")}
							/>

							<FormField
								id="email"
								name="email"
								label="Email"
								type="text"
								placeholder="johndoe@example.com"
								required
								{...form.getInputProps("email")}
							/>

							<div className="col-span-full">
								<FormField
									id="password"
									name="password"
									label="Password"
									type="password"
									placeholder="••••••••"
									required
									{...form.getInputProps("password")}
								/>
							</div>
						</div>

						<div className="mt-9">
							<Button type="submit" className="w-full my-3" disabled={isLoading}>
								{isLoading ? <Spinner size="small"/> : "Register"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
