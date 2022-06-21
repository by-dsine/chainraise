-- CreateTable
CREATE TABLE "OfferingDocument" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "OfferingDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferingDocument" ADD CONSTRAINT "OfferingDocument_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;
