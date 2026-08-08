CREATE TABLE "members" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"unlock_count" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"last_seen_at" timestamp DEFAULT now()
);
