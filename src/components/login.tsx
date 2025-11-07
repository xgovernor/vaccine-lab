"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "@/actions/auth/sign-in";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(data);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Redirect to dashboard or home page on success
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-center text-lg font-semibold text-foreground dark:text-foreground">
        Welcome Back
      </h3>
      <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
        Enter your credentials to access your account.
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/10 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="ephraim@blocks.so"
            className="mt-2"
            disabled={isLoading}
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="**************"
            className="mt-2"
            disabled={isLoading}
            {...form.register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" }
            })}
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            {...form.register("rememberMe")}
          />
          <Label
            htmlFor="rememberMe"
            className="ml-2 text-sm text-foreground dark:text-foreground"
          >
            Remember me
          </Label>
        </div>

        <Button type="submit" className="mt-4 w-full py-2 font-medium" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90"
        >
          Register
        </Link>
      </p>
    </>
  );
}
