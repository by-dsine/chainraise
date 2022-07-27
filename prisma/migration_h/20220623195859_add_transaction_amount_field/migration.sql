/*
  Warnings:

  - Added the required column `timestamp` to the `OfferingUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OfferingUpdate" ADD COLUMN     "timestamp" TIMESTAMPTZ(3) NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "totalAmount" INTEGER NOT NULL;
