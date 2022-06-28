/*
  Warnings:

  - The `ncPartyId` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "ncPartyId",
ADD COLUMN     "ncPartyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ncPartyId_key" ON "Profile"("ncPartyId");
