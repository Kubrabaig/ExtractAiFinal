import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const documentStatusEnum = pgEnum("document_status", [
  "uploaded",
  "processing",
  "completed",
  "failed",
  "reviewed",
  "approved",
  "rejected",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "queued",
  "running",
  "completed",
  "failed",
  "paused",
  "cancelled",
]);

export const fileTypeEnum = pgEnum("file_type", [
  "pdf",
  "docx",
  "jpg",
  "png",
  "tiff",
  "zip",
]);

export const schemaTemplateEnum = pgEnum("schema_template", [
  "invoice",
  "receipt",
  "resume",
  "medical_report",
  "bank_statement",
  "passport",
  "driving_license",
  "utility_bill",
  "tax_form",
  "contract",
  "purchase_order",
  "insurance_claim",
  "employment_letter",
  "custom",
]);

// Documents table
export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  filename: varchar("filename", { length: 255 }).notNull(),
  fileType: fileTypeEnum("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  status: documentStatusEnum("status").notNull().default("uploaded"),
  schemaType: schemaTemplateEnum("schema_type").notNull().default("invoice"),
  filePath: varchar("file_path", { length: 500 }),
  extractedData: jsonb("extracted_data"),
  confidence: real("confidence"),
  processingTime: integer("processing_time"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Extraction Jobs table
export const extractionJobs = pgTable("extraction_jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentId: uuid("document_id").references(() => documents.id),
  status: jobStatusEnum("status").notNull().default("queued"),
  currentStage: varchar("current_stage", { length: 100 }),
  stagesCompleted: integer("stages_completed").default(0),
  totalStages: integer("total_stages").default(10),
  confidence: real("confidence"),
  errorMessage: text("error_message"),
  retryCount: integer("retry_count").default(0),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Custom Schemas table
export const customSchemas = pgTable("custom_schemas", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  fields: jsonb("fields").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// API Keys table
export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  key: varchar("key", { length: 255 }).notNull(),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

// Activity Logs table
export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: varchar("action", { length: 255 }).notNull(),
  details: text("details"),
  entityType: varchar("entity_type", { length: 100 }),
  entityId: uuid("entity_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
