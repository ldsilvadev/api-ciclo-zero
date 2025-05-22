/*
  Warnings:

  - Added the required column `billing_cycle` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `next_renewal_date` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('monthly', 'yearly');

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_user_id_fkey";

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "auto_detected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "billing_cycle" "BillingCycle" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "next_renewal_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
