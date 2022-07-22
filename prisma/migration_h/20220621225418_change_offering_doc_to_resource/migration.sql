/*
  Warnings:

  - You are about to drop the `OfferingDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfferingDocument" DROP CONSTRAINT "OfferingDocument_offeringId_fkey";

-- DropTable
DROP TABLE "OfferingDocument";

-- CreateTable
CREATE TABLE "OfferingResource" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "OfferingResource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferingResource" ADD CONSTRAINT "OfferingResource_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;
