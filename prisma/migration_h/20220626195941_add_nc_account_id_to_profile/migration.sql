/*
  Warnings:

  - A unique constraint covering the columns `[ncAccountId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "ncAccountId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ncAccountId_key" ON "Profile"("ncAccountId");
