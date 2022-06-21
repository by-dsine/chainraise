/*
  Warnings:

  - The `ncPartyId` column on the `UserProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "ncPartyId",
ADD COLUMN     "ncPartyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_ncPartyId_key" ON "UserProfile"("ncPartyId");
