/*
  Warnings:

  - The values [monthly,yearly] on the enum `BillingCycle` will be removed. If these variants are still used in the database, this will fail.
  - The values [free,premium] on the enum `Plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BillingCycle_new" AS ENUM ('MONTHLY', 'YEARLY');
ALTER TABLE "subscriptions" ALTER COLUMN "billing_cycle" TYPE "BillingCycle_new" USING ("billing_cycle"::text::"BillingCycle_new");
ALTER TYPE "BillingCycle" RENAME TO "BillingCycle_old";
ALTER TYPE "BillingCycle_new" RENAME TO "BillingCycle";
DROP TYPE "BillingCycle_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Plan_new" AS ENUM ('FREE', 'PREMIUM');
ALTER TABLE "users" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "plan" TYPE "Plan_new" USING ("plan"::text::"Plan_new");
ALTER TYPE "Plan" RENAME TO "Plan_old";
ALTER TYPE "Plan_new" RENAME TO "Plan";
DROP TYPE "Plan_old";
ALTER TABLE "users" ALTER COLUMN "plan" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "plan" SET DEFAULT 'FREE';
