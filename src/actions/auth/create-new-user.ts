"use server";

import { AUTH_CALLBACK_URL } from "@/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z4 from "zod/v4";

export async function createNewUser({
  ...props
}: {
  name: string;
  email: string;
  role: "receptionist" | "admin" | "su" | "doctor" | "inventoryManager" | "auditor";
  password: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return {
      error: "Unauthorized",
      user: null,
    };
  }

  try {
    const data = await auth.api.createUser({
      body: {
        ...props,
      },
    });

    if (!data?.user) {
      return {
        error: "Failed to create account",
        user: null,
      };
    }

    return {
      error: null,
      user: data.user,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to sign up",
      user: null,
    };
  }
}
