/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Offering` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Offering" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Offering_slug_key" ON "Offering"("slug");
