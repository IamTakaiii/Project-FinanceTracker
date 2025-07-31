import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@mantine/form";
import { Link } from "@tanstack/react-router";

import { cn } from "@/global/lib/utils";
import { BG_IMG_URL } from "@/global/config/constants";
import { ErrorHandler } from "@/global/utils/errors";
import { useLogin } from "@/core/authen/auth-hook";
import { Button } from "@/global/components/ui/button";
import { Card, CardContent } from "@/global/components/ui/card";
import { FormField } from "@/global/components/ui/formfield";
import { Spinner } from "@/global/components/ui/spinner";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
    },
  });

  const onSubmitLogin = (values: { email: string; password: string }) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Login successful");
        navigate({ to: "/dashboard" });
      },
      onError: (error) => {
        ErrorHandler(error);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-sm border border-muted">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={form.onSubmit(onSubmitLogin)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
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

              <Button
                type="submit"
                className="w-full my-3"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Spinner size="small" className="text-white" />
                ) : (
                  "Login"
                )}
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
