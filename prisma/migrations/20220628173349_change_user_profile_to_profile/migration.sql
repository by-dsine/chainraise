/*
  Warnings:

  - You are about to drop the column `profileId` on the `OfferingUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `OfferingUserPost` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `OfferingUserPostComment` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `OfferingUserPostCommentReaction` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `OfferingUserPostReaction` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `OrganizationMembership` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `PlatformRole` table. All the data in the column will be lost.
  - You are about to drop the column `canApprove` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `UserKYCAML` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileId` to the `OfferingUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OfferingUserPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OfferingUserPostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OfferingUserPostCommentReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OfferingUserPostReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `OrganizationMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `PlatformRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canApprovePosts` to the `RolePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `UserKYCAML` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUpdate" DROP CONSTRAINT "OfferingUpdate_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPost" DROP CONSTRAINT "OfferingUserPost_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostComment" DROP CONSTRAINT "OfferingUserPostComment_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" DROP CONSTRAINT "OfferingUserPostCommentReaction_profileId_fkey";

-- DropForeignKey
ALTER TABLE "OfferingUserPostReaction" DROP CONSTRAINT "OfferingUserPostReaction_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationMembership" DROP CONSTRAINT "OrganizationMembership_profileId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformRole" DROP CONSTRAINT "PlatformRole_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_profileId_fkey";

-- DropForeignKey
ALTER TABLE "UserKYCAML" DROP CONSTRAINT "UserKYCAML_profileId_fkey";

-- DropForeignKey
ALTER TABLE "UserPost" DROP CONSTRAINT "UserPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostComment" DROP CONSTRAINT "UserPostComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostCommentReaction" DROP CONSTRAINT "UserPostCommentReaction_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostReaction" DROP CONSTRAINT "UserPostReaction_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "OfferingUpdate" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPost" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostComment" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostCommentReaction" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OfferingUserPostReaction" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "ownerId",
ADD COLUMN     "contactId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationMembership" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlatformRole" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "canApprove",
ADD COLUMN     "canApprovePosts" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserKYCAML" DROP COLUMN "profileId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "ncPartyId" TEXT,
    "ncAccountId" TEXT,
    "ncLinkId" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "bio" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "unit" TEXT,
    "city" TEXT,
    "country" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "accreditationStatus" TEXT DEFAULT E'Not Started',
    "dob" TIMESTAMP(3),
    "residence" TEXT,
    "accountType" TEXT,
    "entityName" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ncPartyId_key" ON "Profile"("ncPartyId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ncAccountId_key" ON "Profile"("ncAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformRole" ADD CONSTRAINT "PlatformRole_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostComment" ADD CONSTRAINT "UserPostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostCommentReaction" ADD CONSTRAINT "UserPostCommentReaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUpdate" ADD CONSTRAINT "OfferingUpdate_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPost" ADD CONSTRAINT "OfferingUserPost_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostReaction" ADD CONSTRAINT "OfferingUserPostReaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostComment" ADD CONSTRAINT "OfferingUserPostComment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" ADD CONSTRAINT "OfferingUserPostCommentReaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKYCAML" ADD CONSTRAINT "UserKYCAML_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
