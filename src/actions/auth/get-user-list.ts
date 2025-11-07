"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserList({
  limit = 10,
  offset = 0,
  sortBy = "createdAt",
  sortDirection = "desc",
}: {
  limit?: number;
  offset?: number;
  sortBy?: "createdAt";
  sortDirection?: "desc";
}) {
  try {
    const data = await auth.api.listUsers({
      query: { limit, offset, sortBy, sortDirection },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    if (!data) {
      return {
        error: "Failed to create account",
        user: null,
      };
    }

    return {
      error: null,
      users: data.users,
      total: data.total,
      limit: limit,
      offset: offset,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to sign up",
      users: null,
    };
  }
}
