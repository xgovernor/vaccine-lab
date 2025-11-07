import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
import { APP_URL } from "@/config";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || APP_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
});

export type Session = typeof authClient.$Infer.Session;
