/*
  Warnings:

  - A unique constraint covering the columns `[fortressId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "fortressId" TEXT;

-- CreateTable
CREATE TABLE "ProfileDocument" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProfileDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_fortressId_key" ON "Profile"("fortressId");

-- AddForeignKey
ALTER TABLE "ProfileDocument" ADD CONSTRAINT "ProfileDocument_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
