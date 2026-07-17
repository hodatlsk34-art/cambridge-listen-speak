import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  loginCode: text("login_code").notNull(),
  displayName: text("display_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  passwordSalt: text("password_salt").notNull(),
  role: text("role").notNull().default("student"),
  level: text("level").notNull().default("Pre A1"),
  active: integer("active").notNull().default(1),
  mustChangePassword: integer("must_change_password").notNull().default(1),
  isMinor: integer("is_minor").notNull().default(1),
  parentConsentAt: integer("parent_consent_at"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
}, (table) => [uniqueIndex("users_login_code_unique").on(table.loginCode), index("users_role_idx").on(table.role)]);

export const progress = sqliteTable("progress", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), lessonId: text("lesson_id").notNull(),
  listeningScore: integer("listening_score"), pronunciationScore: integer("pronunciation_score"), completedAt: integer("completed_at"), updatedAt: integer("updated_at").notNull(),
}, (table) => [uniqueIndex("progress_user_lesson_unique").on(table.userId, table.lessonId), index("progress_user_idx").on(table.userId)]);

export const recordings = sqliteTable("recordings", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), lessonId: text("lesson_id").notNull(), objectKey: text("object_key").notNull(),
  contentType: text("content_type").notNull(), sizeBytes: integer("size_bytes").notNull(), pronunciationScore: integer("pronunciation_score"), createdAt: integer("created_at").notNull(),
}, (table) => [index("recordings_user_idx").on(table.userId)]);

export const pilotFeedback = sqliteTable("pilot_feedback", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), rating: integer("rating").notNull(), role: text("tester_role").notNull(), message: text("message").notNull(), createdAt: integer("created_at").notNull(),
}, (table) => [index("pilot_feedback_user_idx").on(table.userId)]);
