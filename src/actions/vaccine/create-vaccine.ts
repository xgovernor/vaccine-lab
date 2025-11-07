"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { vaccine } from "../../../db/schema";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

type createNewVaccineProps = {
  code: string;
  name: string;
  manufacturer: string;
  antigen: string;
  series_name: string;
  dose_count: number;
  dose_volume: string;
  dose_unit: string;
  route: string;
  site_examples: string;
  min_age_months: number;
  notes: string;
};

export async function createNewVaccine(props: createNewVaccineProps) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return {
      error: "Unauthorized",
      user: null,
    };
  }

  const id = randomUUID();

  try {
    const data = await db
      .insert(vaccine)
      .values({
        id,
        ...props,
        createdBy: session.user.id,
      })
      .returning();

    if (!data) {
      return {
        error: "Failed to create vaccine",
        data: null,
      };
    }

    return {
      error: null,
      message: "Vaccine created successfully",
      data: data,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to sign up",
      data: null,
    };
  }
}
