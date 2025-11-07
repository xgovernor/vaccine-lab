"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { authClient } from "@/lib/auth-client";


const ROLES = [
  { value: "receptionist", label: "Receptionist" },
  { value: "doctor", label: "Doctor" },
  { value: "inventoryManager", label: "Inventory Manager" },
  { value: "auditor", label: "Auditor" },
]

export type TRole = "receptionist" | "admin" | "su" | "doctor" | "inventoryManager" | "auditor";

type TFormData = {
  userId: string;
  role: TRole;
}

export default function UpdateUserRoleForm({ userId, currentRole }: { userId: string; currentRole: TRole | undefined }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TFormData>({
    defaultValues: {
      userId,
      role: currentRole,
    },
  });

  const onSubmit = async (data: TFormData) => {
    setIsLoading(true);
    setError(null);

    try {

      const res = await authClient.admin.setRole({
        userId,
        // @ts-expect-error setRole method is unable to infer type correctly
        role: data?.role, // required
      });

      if (res.error) {
        setError(res.error.message || "Failed to update user role");
        return;
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <div className="p-4 rounded-lg bg-white border border-gray-200">
      <h3 className="text-md text-center font-semibold text-foreground dark:text-foreground">
        Update User Role
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">

        {/* Role */}
        <div className="col-span-full sm:col-span-3">
          <Controller
            control={form.control}
            name="role"
            render={({ field }) => (
              <Select defaultValue={currentRole} {...field} onValueChange={field.onChange}>
                <SelectTrigger id="role" className="w-full mt-2">
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


        <Button type="submit" className="w-full mt-3 whitespace-nowrap" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Role"}
        </Button>

      </form>
    </div>
  );
}
