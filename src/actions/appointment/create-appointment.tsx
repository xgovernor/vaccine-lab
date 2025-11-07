"use server";

import { AUTH_CALLBACK_URL } from "@/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createAppointment({
    name,
    email,
    password,
    callbackURL = AUTH_CALLBACK_URL
}: {
    name: string;
    email: string;
    password: string;
    callbackURL?: string;
}) {
    try {
        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL,
            },
            headers: await headers(),
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
            token: data.token,
        };
    } catch (error) {
        console.error("Sign up error:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to sign up",
            user: null,
        };
    }
}
