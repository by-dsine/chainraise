/*
  Warnings:

  - You are about to drop the column `userId` on the `OfferingUserPost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OfferingUserPostComment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OfferingUserPostCommentReaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OfferingUserPostReaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrganizationMembership` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PlatformRole` table. All the data in the column will be lost.
  - You are about to drop the column `amlStatus` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `kycStatus` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `userProfileId` to the `OfferingUserPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `OfferingUserPostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `OfferingUserPostCommentReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `OfferingUserPostReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `OrganizationMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `PlatformRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OfferingUserPost" DROP CONSTRAINT "OfferingUserPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostComment" DROP CONSTRAINT "OfferingUserPostComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" DROP CONSTRAINT "OfferingUserPostCommentReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostReaction" DROP CONSTRAINT "OfferingUserPostReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationMembership" DROP CONSTRAINT "OrganizationMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformRole" DROP CONSTRAINT "PlatformRole_userId_fkey";

-- AlterTable
ALTER TABLE "OfferingUserPost" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostComment" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostCommentReaction" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostReaction" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationMembership" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlatformRole" DROP COLUMN "userId",
ADD COLUMN     "userProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "amlStatus",
DROP COLUMN "kycStatus";

-- CreateTable
CREATE TABLE "UserKYCAML" (
    "id" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "kycStatus" TEXT DEFAULT E'Not Started',
    "amlStatus" TEXT DEFAULT E'Not Started',

    CONSTRAINT "UserKYCAML_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlatformRole" ADD CONSTRAINT "PlatformRole_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPost" ADD CONSTRAINT "OfferingUserPost_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostReaction" ADD CONSTRAINT "OfferingUserPostReaction_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostComment" ADD CONSTRAINT "OfferingUserPostComment_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" ADD CONSTRAINT "OfferingUserPostCommentReaction_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKYCAML" ADD CONSTRAINT "UserKYCAML_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
