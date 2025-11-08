"use server";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { vaccine } from "../../../db/schema";

export async function getVaccineDetails({ id }: { id: string }) {
  try {
    // Query vaccine from database using Drizzle ORM
    const data = await db.select().from(vaccine).where(eq(vaccine.id, id)).limit(1);

    if (!data || data.length === 0) {
      return {
        error: "Vaccine not found",
        vaccine: null,
      };
    }

    return {
      error: null,
      vaccine: data[0],
    };
  } catch (error) {
    console.error("Get vaccine details error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to get vaccine details",
      vaccine: null,
    };
  }
}
