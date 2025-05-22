/*
  Warnings:

  - You are about to drop the column `next_renewal_date` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `installment` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "next_renewal_date",
ADD COLUMN     "installment" DECIMAL(65,30) NOT NULL;
