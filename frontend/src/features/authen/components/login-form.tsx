import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";

import { cn } from "@/lib/utils";
import { loginByEmail } from "../api/auth";
import { BG_IMG_URL } from "@/config/constants";
import { AuthStore } from "@/stores/auth";
import { ErrorHandler } from "@/utils/errors";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/ui/formfield";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const { login, getme } = AuthStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters long"),
        },
    });

    const onSubmitLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const authInfo = await loginByEmail(values.email, values.password);
            if (authInfo.error) {
                throw new Error(authInfo.error.message);
            }
            if (authInfo.data) {
                login(authInfo.data.user);
                getme({
                    id: authInfo.data.user.id,
                    email: authInfo.data.user.email,
                    name: authInfo.data.user.name,
                    image: authInfo.data.user.image,
                    emailVerified: authInfo.data.user.emailVerified,
                    createdAt: new Date(authInfo.data.user.createdAt),
                    updatedAt: new Date(authInfo.data.user.updatedAt),
                });
                navigate({ to: "/dashboard" });
            }
        } catch (error) {
            ErrorHandler(error instanceof Error ? error : new Error("An unknown error occurred"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0 shadow-sm border border-muted">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={form.onSubmit(onSubmitLogin)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">Login to your account</p>
                            </div>

                            <FormField
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                placeholder="johndoe@example.com"
                                required
                                {...form.getInputProps("email")}
                            />

                            <FormField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••••"
                                required
                                {...form.getInputProps("password")}
                            />

                            <Button type="submit" className="w-full my-3" disabled={isLoading}>
                                {isLoading ? <Spinner size="small" className="text-white" /> : "Login"}
                            </Button>

                            <div className="text-center text-sm color-primary">
                                Don't have an account?{" "}
                                <Link to="/register" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src={BG_IMG_URL}
                            loading="lazy"
                            alt="Abstract geometric shapes"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our{" "}
                {/* <Link to="/terms-of-service">Terms of Service</Link> and{" "}
                <Link to="/privacy-policy">Privacy Policy</Link>. */}
            </div>
        </div>
    );
}