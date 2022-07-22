/*
  Warnings:

  - A unique constraint covering the columns `[ncPartyId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "ncPartyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ncPartyId_key" ON "Profile"("ncPartyId");
