/*
  Warnings:

  - A unique constraint covering the columns `[ncPartyId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "ncPartyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_ncPartyId_key" ON "UserProfile"("ncPartyId");
