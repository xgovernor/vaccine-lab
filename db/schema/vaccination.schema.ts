import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { vaccine } from "./vaccine.schema";
import { patient } from "./patient.schema";
import { facility } from "./facility.schema";

export const vaccination = pgTable("vaccinations", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .references(() => user.id)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),

  vaccineId: text("vaccine_id")
    .references(() => vaccine.id)
    .notNull(),
  patientId: text("patient_id")
    .references(() => patient.id)
    .notNull(),
  facilityId: text("facility_id")
    .references(() => facility.id)
    .notNull(),
  vaccination_date: date("vaccination_date").notNull(),
  vaccinatorId: text("vaccinator_id")
    .references(() => user.id)
    .notNull(),
  dose_number: serial("dose_number").notNull(),
  nextDueAt: date("next_due_at"),
  notes: text("notes"),
});
