"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { vaccine } from "../../../db/schema";

export async function getVaccineList({
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
    const data = await db
      .select({
        id: vaccine.id,
        name: vaccine.name,
        batchNumber: vaccine.code,
        expiryDate: vaccine.updatedAt,
        doseCount: vaccine.dose_count,
        manufacturer: vaccine.manufacturer,
      })
      .from(vaccine);

    if (!data) {
      return {
        error: "Failed to fetch vaccine list",
        user: null,
      };
    }

    return {
      error: null,
      data,
      total: data.length,
      limit: limit,
      offset: offset,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to fetch vaccine list",
      data: null,
    };
  }
}
