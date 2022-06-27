/*
  Warnings:

  - A unique constraint covering the columns `[ncAccountId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "ncAccountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_ncAccountId_key" ON "UserProfile"("ncAccountId");
