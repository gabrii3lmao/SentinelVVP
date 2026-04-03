import {
  pgTable,
  uuid,
  timestamp,
  text,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  tokenVersion: uuid("token_version").defaultRandom().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const domains = pgTable("Domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  userid: uuid("userid")
    .notNull()
    .references(() => users.id),
  url: varchar("url", { length: 255 }).notNull(),
  checkInterval: integer("check_interval").notNull().default(60), // in seconds
  timeout: integer("timeout").notNull().default(5000), // in milliseconds
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  lastChecked: timestamp("last_checked"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const logs = pgTable("Logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  domainId: uuid("domain_id")
    .notNull()
    .references(() => domains.id, { onDelete: "cascade" }),
  statusCode: integer("status_code").notNull(),
  responseTime: integer("latency_ms").notNull(),
  errorMessage: text("error_message"),
  isSuccess: boolean("is_success").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
