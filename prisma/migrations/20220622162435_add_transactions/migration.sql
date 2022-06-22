-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "ncTradeId" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "transactionUnits" INTEGER NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;
