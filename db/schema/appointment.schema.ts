import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { getId } from "@/lib/get-id";
import { user } from "./auth.schema";
import { facility } from "./facility.schema";
import { patient } from "./patient.schema";

export const appointment = pgTable("appointment", {
  id: text("id").primaryKey().default(getId()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: varchar("created_by", { length: 100 })
    .notNull()
    .references(() => user.id),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  status: varchar("status").notNull(),
  regNo: varchar("reg_no").notNull(),

  vaccinator: varchar("vaccinator")
    .notNull()
    .references(() => user.id),
  patient: varchar("patient_id")
    .notNull()
    .references(() => patient.id),

  // Address Information
  facility: text("facility")
    .notNull()
    .references(() => facility.id), // e.g., "City Hospital", "Downtown Clinic"
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: varchar("zip").notNull(),
  country: text("country").notNull().default("Bangladesh"),
});
