"use server";

import { db } from "@/lib/db";
import { user } from "../../../db/schema/auth.schema";
import { eq } from "drizzle-orm";

export async function getUserDetails({ id }: { id: string }) {
  try {
    // Query user from database using Drizzle ORM
    const data = await db.select().from(user).where(eq(user.id, id)).limit(1);

    if (!data || data.length === 0) {
      return {
        error: "User not found",
        user: null,
      };
    }

    return {
      error: null,
      user: data[0],
    };
  } catch (error) {
    console.error("Get user details error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to get user details",
      user: null,
    };
  }
}
