CREATE TABLE "Projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Domains" RENAME COLUMN "userid" TO "user_id";--> statement-breakpoint
ALTER TABLE "Domains" DROP CONSTRAINT "Domains_userid_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Domains" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_project_id_Projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."Projects"("id") ON DELETE cascade ON UPDATE no action;