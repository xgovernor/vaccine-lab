import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import  authSchema from "../../db/schema/auth.schema";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import z4 from "zod/v4";
import { APP_URL } from "@/config";
import { ac, userRoles } from "@/lib/permission";

export const auth = betterAuth({
  appName: "Vaccine Lab",
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    window: 60 * 15, // 15 minutes
    max: 100, // More reasonable limit for production
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days for better user experience
    updateAge: 60 * 60 * 24, // 1 day
    preserveSessionInDatabase: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || APP_URL,
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
  plugins: [
    nextCookies(),
    adminPlugin({
      defaultRole: "receptionist",
      ac,
      roles: { ...userRoles },
      impersonationSessionDuration: 60 * 30, // 30 minutes
      banDefaults: {
        reason: "Violation of terms of service",
        duration: "7d",
      },
    }),
  ],
  user: {
    additionalFields: {
      status: {
        type: "string",
        required: true,
        defaultValue: "active",
        enum: ["active", "inactive", "pending_verification"],
        input: false,
        sortable: true,
      },
      profileComplete: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
        sortable: true,
      },
      lastLoginAt: {
        type: "date",
        required: false,
        input: false,
        sortable: true,
      },
      archivedAt: {
        type: "date",
        required: false,
        input: false,
        sortable: true,
      },
      dob: {
        type: "date",
        required: false,
        sortable: true,
        validator: {
          input: z4.date().max(new Date(), "Date of birth cannot be in the future"),
          output: z4.date(),
        },
      },
      gender: {
        type: "string",
        required: false,
        enum: ["male", "female", "other"],
        sortable: true,
      },
      bloodGroup: {
        type: "string",
        required: false,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        sortable: true,
      },
      maritalStatus: {
        type: "string",
        required: false,
        enum: ["single", "married", "divorced", "widowed", "separated"],
        sortable: true,
      },
      fatherName: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(2).max(100),
          output: z4.string().min(2).max(100),
        },
      },
      motherName: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(2).max(100),
          output: z4.string().min(2).max(100),
        },
      },
      phone: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().regex(/^\+?[\d\s\-\(\)]{10,20}$/, "Invalid phone number format"),
          output: z4.string(),
        },
        sortable: true,
      },

      // Address Information
      addressLine1: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(5).max(200),
          output: z4.string(),
        },
      },
      addressLine2: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().max(200),
          output: z4.string(),
        },
      },
      city: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(2).max(100),
          output: z4.string().min(2).max(100),
        },
        sortable: true,
      },
      state: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(2).max(100),
          output: z4.string().min(2).max(100),
        },
        sortable: true,
      },
      postalCode: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(3).max(20),
          output: z4.string().min(3).max(20),
        },
        sortable: true,
      },
      country: {
        type: "string",
        required: false,
        defaultValue: "BD",
        validator: {
          input: z4.string().length(2, "Country code must be 2 characters"),
          output: z4.string().length(2),
        },
        sortable: true,
      },

      // Identification
      nidNumber: {
        type: "string",
        required: false,
        validator: {
          input: z4.string().min(10).max(20),
          output: z4.string().min(10).max(20),
        },
        unique: true,
      },
    },
  },
});
