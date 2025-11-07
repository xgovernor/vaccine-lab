import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const vaccine = pgTable("vaccines", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .references(() => user.id)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),

  code: text("code").unique(), // CVX/SNOMED or your internal code
  name: text("name").notNull(), // "MMR", "COVID-19 (mRNA-XYZ)"
  manufacturer: text("manufacturer"), // canonical manufacturer name
  antigen: text("antigen"), // disease target e.g., "measles"
  series_name: text("series_name"), // "Primary series", "Booster"
  dose_count: serial("dose_count"), // typical total doses in series
  dose_volume: text("dose_volume"), // e.g. 0.5
  dose_unit: text("dose_unit"), // ml / mcg
  route: text("route"), // IM / SC / PO
  site_examples: text("site_examples"), // deltoid, anterolateral thigh
  min_age_months: serial("min_age_months"), // optional scheduling constraints
  notes: text("notes"),
});
