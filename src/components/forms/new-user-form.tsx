"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createNewUser } from "@/actions";

const ROLES = [
  { value: "receptionist", label: "Receptionist" },
  { value: "doctor", label: "Doctor" },
  { value: "inventoryManager", label: "Inventory Manager" },
  { value: "auditor", label: "Auditor" },
]

type TFormData = {
  name: string;
  email: string;
  role: "receptionist" | "admin" | "su" | "doctor" | "inventoryManager" | "auditor";
  password: string;
  repeatPassword: string;
}

export default function NewUserForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TFormData>({
    defaultValues: {
      name: "",
      role: "receptionist",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data: TFormData) => {
    setIsLoading(true);
    setError(null);

    if (data.password !== data.repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Form Data  ", data);
      const result = await createNewUser(data);

      if (result.error) {
        setError(result.error);
        return;
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-2xl font-semibold text-foreground dark:text-foreground">
          Add new stuff
        </h3>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
          Take a few moments to register for your company&apos;s workspace
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">

            {/* Name */}
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Name
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                autoComplete="name"
                placeholder="John Doe"
                className="mt-2"
                required
                {...form.register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                  maxLength: { value: 50, message: "Name must be at most 50 characters" },
                })}
              />

              {form.formState.errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="role"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Role
                <span className="text-red-500">*</span>
              </Label>

              <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <Select defaultValue="private" {...field} onValueChange={field.onChange}>
                    <SelectTrigger id="role" className="mt-2">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )} />

              {form.formState.errors.role && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="col-span-full">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                className="mt-2"
                required
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email must be a valid email address",
                  },
                })}
              />

              {form.formState.errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-2"
                required
                {...form.register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 32, message: "Password must be at most 32 characters" },
                })}
              />

              {form.formState.errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Repeat Password
              </Label>
              <Input
                type="password"
                id="repeatPassword"
                required
                {...form.register("repeatPassword", {
                  required: "Repeat Password is required",
                  validate: (value) =>
                    value === form.getValues("password") ||
                    "Passwords do not match",
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
              {isLoading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
