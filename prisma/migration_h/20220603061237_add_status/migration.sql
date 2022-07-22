/*
  Warnings:

  - You are about to drop the column `status` on the `Offering` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `OfferingStatusHistory` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Offering` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `OfferingStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offering" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OfferingStatusHistory" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingStatusHistory" ADD CONSTRAINT "OfferingStatusHistory_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
