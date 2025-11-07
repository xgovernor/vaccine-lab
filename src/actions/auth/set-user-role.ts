"use server";

import { AUTH_CALLBACK_URL } from "@/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function setUserRole({ userId, role }: { userId: string; role: string }) {
  try {
    const data = await auth.api.setRole({
      body: {
        userId: "user-id",
        role: "admin", // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    if (!data?.user) {
      return {
        error: "Failed to set user role",
        message: "User role could not be updated",
        user: null,
      };
    }

    return {
      error: null,
      message: "User role updated successfully",
      user: data.user,
    };
  } catch (error) {
    console.error("Set user role error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to set user role",
      user: null,
    };
  }
}
