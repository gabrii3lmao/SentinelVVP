CREATE TABLE "Domains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userid" uuid NOT NULL,
	"url" varchar(255) NOT NULL,
	"check_interval" integer DEFAULT 60 NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"last_checked" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain_id" uuid NOT NULL,
	"status_code" integer NOT NULL,
	"latency_ms" integer NOT NULL,
	"error_message" text,
	"is_success" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"token_version" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_userid_Users_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_domain_id_Domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."Domains"("id") ON DELETE cascade ON UPDATE no action;