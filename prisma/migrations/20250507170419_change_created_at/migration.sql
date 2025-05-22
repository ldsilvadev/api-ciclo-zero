/*
  Warnings:

  - You are about to drop the column `createdAt` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
