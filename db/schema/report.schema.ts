import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const report = pgTable("report", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),

  name: text("name").notNull(),
  description: text("description"),
  ownerUserId: text("owner_user_id")
    .notNull()
    .references(() => user.id),

  // AI-generated content
  content: text("content").notNull(), // Markdown content
  model: text("model").notNull(), // AI model used (e.g., "gpt-4", "claude-3")
  prompt: text("prompt"), // Original prompt/request
  status: text("status").notNull().default("pending"), // pending, generating, completed, failed

  // Report configuration
  reportType: text("report_type").notNull(), // e.g., "vaccination_summary", "inventory_analysis"
  filters: jsonb("filters"), // Filter criteria used to generate the report
  metadata: jsonb("metadata"), // Additional metadata (tokens used, generation time, etc.)
});
