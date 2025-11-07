import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { getId } from "@/lib/get-id";
import { user } from "./auth.schema";

export const patient = pgTable("patient", {
  id: text("id").primaryKey().default(getId()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedBy: varchar("updated_by", { length: 100 }).references(() => user.id),

  // Contact Information
  name: varchar("name", { length: 100 }).notNull(),
  dob: timestamp("dob"),
  gender: text("gender"),
  fatherName: text("father_name"),
  motherName: text("mother_name"),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),

  // Address Information
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  country: text("country").notNull().default("Bangladesh"),

  // Documents
  nationalId: varchar("national_id", { length: 50 }).unique(),
  birthCertificateId: varchar("birth_certificate_id", { length: 50 }).unique(),
});
