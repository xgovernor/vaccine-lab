"use server";

import { AUTH_CALLBACK_URL } from "@/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signIn({
  email,
  password,
  rememberMe = false,
  callbackURL = AUTH_CALLBACK_URL
}: {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
}) {
  try {
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
        callbackURL,
      },
      headers: await headers(),
    });

    if (!data?.user) {
      return {
        error: "Failed to sign in",
        user: null,
      };
    }

    return {
      error: null,
      user: data.user,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to sign in",
      user: null,
    };
  }
}
