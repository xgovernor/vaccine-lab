import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { getId } from "@/lib/get-id";

export const facility = pgTable("facility", {
  id: text("id").primaryKey().default(getId()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 100 }),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  status: varchar("status").notNull(),

  title: text("title").notNull(), // e.g., "City Hospital", "Downtown Clinic"

  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: varchar("zip").notNull(),
  country: text("country").notNull().default("Bangladesh"),

  phone: varchar("phone", { length: 15 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),

  //
  capacity: varchar("capacity"), // e.g., "100 patients/day"
  weekdays: jsonb("weekdays"), // e.g., ["Monday", "Tuesday", "Wednesday"]
  hours: varchar("hours"), // e.g., "9:00 AM - 5:00 PM"
  notes: text("notes"),
});
