"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";


type TFormData = {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export default function NewUserForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data: TFormData) => {
    setIsLoading(true);
    setError(null);

    if (data.newPassword !== data.repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Form Data  ", data);
      // const result = await updateUserPassword(data);

      // if (result.error) {
      //   setError(result.error);
      //   return;
      // }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <div className="p-4 rounded-lg bg-white border border-gray-200">
      <h3 className="text-2xl font-semibold text-foreground dark:text-foreground">
        Add new stuff
      </h3>
      <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
        Take a few moments to register for your company&apos;s workspace
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">

          {/* Current Password */}
          <div className="col-span-full sm:col-span-3">
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-foreground dark:text-foreground"
            >
              Current Password
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              autoComplete="name"
              placeholder="John Doe"
              className="mt-2"
              required
              {...form.register("currentPassword", {
                required: "Current Password is required",
                minLength: { value: 6, message: "Current Password must be at least 6 characters" },
              })}
            />

            {form.formState.errors.currentPassword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="col-span-full">
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-foreground dark:text-foreground"
            >
              New Password
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="New Password"
              className="mt-2"
              required
              {...form.register("newPassword", {
                required: "New Password is required",
                minLength: { value: 6, message: "New Password must be at least 6 characters" },
                maxLength: { value: 100, message: "New Password must be at most 100 characters" },
              })}
            />

            {form.formState.errors.newPassword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Repeat New Password */}
          <div className="col-span-full">
            <Label
              htmlFor="repeatPassword"
              className="text-sm font-medium text-foreground dark:text-foreground"
            >
              Repeat New Password
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              id="repeatPassword"
              placeholder="Repeat New Password"
              className="mt-2"
              required
              {...form.register("repeatPassword", {
                required: "Repeat New Password is required",
                minLength: { value: 6, message: "Repeat New Password must be at least 6 characters" },
                maxLength: { value: 32, message: "Repeat New Password must be at most 32 characters" },
              })}
            />

            {form.formState.errors.repeatPassword && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {form.formState.errors.repeatPassword.message}
              </p>
            )}
          </div>



        </div>
        <Separator className="my-6" />
        <div className="flex items-center justify-end space-x-4">

          <Button type="submit" className="whitespace-nowrap" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
