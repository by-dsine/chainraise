/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,profileId]` on the table `OrganizationMembership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `founded` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `OrganizationMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `OrganizationRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `OrganizationRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "founded" TEXT NOT NULL,
ADD COLUMN     "industries" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationMembership" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationRole" ADD COLUMN     "isOwner" BOOLEAN NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "OrganizationExternalLink" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "linkName" TEXT NOT NULL,
    "linkIcon" TEXT NOT NULL,

    CONSTRAINT "OrganizationExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMembership_organizationId_profileId_key" ON "OrganizationMembership"("organizationId", "profileId");

-- AddForeignKey
ALTER TABLE "OrganizationExternalLink" ADD CONSTRAINT "OrganizationExternalLink_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
