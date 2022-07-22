-- CreateTable
CREATE TABLE "OfferingUpdate" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "OfferingUpdate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OfferingUpdate" ADD CONSTRAINT "OfferingUpdate_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUpdate" ADD CONSTRAINT "OfferingUpdate_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;
