CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	"status" text DEFAULT 'active' NOT NULL,
	"profile_complete" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp,
	"archived_at" timestamp,
	"dob" timestamp,
	"gender" text,
	"blood_group" text,
	"marital_status" text,
	"father_name" text,
	"mother_name" text,
	"phone" text,
	"address_line1" text,
	"address_line2" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"country" text DEFAULT 'BD',
	"nid_number" text,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_nid_number_unique" UNIQUE("nid_number")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"id" text PRIMARY KEY DEFAULT 'xvXnKglXFkTPPEbvdD99W' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(100),
	"name" varchar(100) NOT NULL,
	"dob" timestamp,
	"gender" text,
	"father_name" text,
	"mother_name" text,
	"email" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" varchar(10) NOT NULL,
	"country" text DEFAULT 'Bangladesh' NOT NULL,
	"national_id" varchar(50),
	"birth_certificate_id" varchar(50),
	CONSTRAINT "patient_email_unique" UNIQUE("email"),
	CONSTRAINT "patient_national_id_unique" UNIQUE("national_id"),
	CONSTRAINT "patient_birth_certificate_id_unique" UNIQUE("birth_certificate_id")
);
--> statement-breakpoint
CREATE TABLE "appointment" (
	"id" text PRIMARY KEY DEFAULT 'RJizl8Gh_EhN7XtvrkNqm' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(100) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar NOT NULL,
	"reg_no" varchar NOT NULL,
	"vaccinator" varchar NOT NULL,
	"patient_id" varchar NOT NULL,
	"facility" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" varchar NOT NULL,
	"country" text DEFAULT 'Bangladesh' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vaccines" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"code" text,
	"name" text NOT NULL,
	"manufacturer" text,
	"antigen" text,
	"series_name" text,
	"dose_count" serial NOT NULL,
	"dose_volume" text,
	"dose_unit" text,
	"route" text,
	"site_examples" text,
	"min_age_months" serial NOT NULL,
	"notes" text,
	CONSTRAINT "vaccines_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "facility" (
	"id" text PRIMARY KEY DEFAULT 'SlMhYhto8-ZDZvmJkaACK' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(100),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar NOT NULL,
	"title" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" varchar NOT NULL,
	"country" text DEFAULT 'Bangladesh' NOT NULL,
	"phone" varchar(15) NOT NULL,
	"email" varchar(100) NOT NULL,
	"capacity" varchar,
	"weekdays" jsonb,
	"hours" varchar,
	"notes" text,
	CONSTRAINT "facility_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"owner_user_id" text NOT NULL,
	"content" text NOT NULL,
	"model" text NOT NULL,
	"prompt" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"report_type" text NOT NULL,
	"filters" jsonb,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "vaccinations" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"vaccine_id" text NOT NULL,
	"patient_id" text NOT NULL,
	"facility_id" text NOT NULL,
	"vaccination_date" date NOT NULL,
	"vaccinator_id" text NOT NULL,
	"dose_number" serial NOT NULL,
	"next_due_at" date,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_vaccinator_user_id_fk" FOREIGN KEY ("vaccinator") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_facility_facility_id_fk" FOREIGN KEY ("facility") REFERENCES "public"."facility"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccines" ADD CONSTRAINT "vaccines_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_owner_user_id_user_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_vaccine_id_vaccines_id_fk" FOREIGN KEY ("vaccine_id") REFERENCES "public"."vaccines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_facility_id_facility_id_fk" FOREIGN KEY ("facility_id") REFERENCES "public"."facility"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccinations" ADD CONSTRAINT "vaccinations_vaccinator_id_user_id_fk" FOREIGN KEY ("vaccinator_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;