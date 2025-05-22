/*
  Warnings:

  - You are about to alter the column `installment` on the `subscriptions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "installment" SET DATA TYPE INTEGER;
