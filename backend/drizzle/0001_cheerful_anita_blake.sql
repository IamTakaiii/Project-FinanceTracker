ALTER TABLE "wallets" ADD COLUMN "balance" numeric(10, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
DROP TYPE "public"."transaction_type";