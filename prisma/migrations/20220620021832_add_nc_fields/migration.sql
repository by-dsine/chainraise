/*
  Warnings:

  - A unique constraint covering the columns `[ncOfferingId]` on the table `Offering` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ncIssuerId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ncOfferingId` to the `Offering` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offering" ADD COLUMN     "ncOfferingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Offering_ncOfferingId_key" ON "Offering"("ncOfferingId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_ncIssuerId_key" ON "Organization"("ncIssuerId");
