/*
  Warnings:

  - The primary key for the `UserReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserReaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `reactionId` on the `UserPostCommentReaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reactionId` on the `UserPostReaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OrganizationMembership" DROP CONSTRAINT "OrganizationMembership_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostCommentReaction" DROP CONSTRAINT "UserPostCommentReaction_reactionId_fkey";

-- DropForeignKey
ALTER TABLE "UserPostReaction" DROP CONSTRAINT "UserPostReaction_reactionId_fkey";

-- AlterTable
ALTER TABLE "UserPostCommentReaction" DROP COLUMN "reactionId",
ADD COLUMN     "reactionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserPostReaction" DROP COLUMN "reactionId",
ADD COLUMN     "reactionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserReaction" DROP CONSTRAINT "UserReaction_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserReaction_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Offering" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "startTimestamp" TIMESTAMPTZ(3) NOT NULL,
    "endTimestamp" TIMESTAMPTZ(3) NOT NULL,
    "minimumInvestment" INTEGER NOT NULL,
    "goal" INTEGER NOT NULL,
    "pledged" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "disclosure" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingParameter" (
    "id" SERIAL NOT NULL,
    "endTimestamp" TIMESTAMPTZ(3) NOT NULL,
    "goal" INTEGER NOT NULL,
    "offeringId" TEXT NOT NULL,

    CONSTRAINT "OfferingParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingStatusHistory" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "OfferingStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingSection" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "OfferingSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionResource" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "SectionResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingUserPost" (
    "id" TEXT NOT NULL,
    "offeringId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "OfferingUserPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingUserPostReaction" (
    "id" TEXT NOT NULL,
    "offeringPostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "OfferingUserPostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingUserPostComment" (
    "id" TEXT NOT NULL,
    "offeringPostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "OfferingUserPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferingUserPostCommentReaction" (
    "id" TEXT NOT NULL,
    "offeringPostCommentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "OfferingUserPostCommentReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostCommentReaction" ADD CONSTRAINT "UserPostCommentReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingParameter" ADD CONSTRAINT "OfferingParameter_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingStatusHistory" ADD CONSTRAINT "OfferingStatusHistory_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingSection" ADD CONSTRAINT "OfferingSection_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResource" ADD CONSTRAINT "SectionResource_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "OfferingSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPost" ADD CONSTRAINT "OfferingUserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPost" ADD CONSTRAINT "OfferingUserPost_offeringId_fkey" FOREIGN KEY ("offeringId") REFERENCES "Offering"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostReaction" ADD CONSTRAINT "OfferingUserPostReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostReaction" ADD CONSTRAINT "OfferingUserPostReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostReaction" ADD CONSTRAINT "OfferingUserPostReaction_offeringPostId_fkey" FOREIGN KEY ("offeringPostId") REFERENCES "OfferingUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostComment" ADD CONSTRAINT "OfferingUserPostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostComment" ADD CONSTRAINT "OfferingUserPostComment_offeringPostId_fkey" FOREIGN KEY ("offeringPostId") REFERENCES "OfferingUserPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" ADD CONSTRAINT "OfferingUserPostCommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" ADD CONSTRAINT "OfferingUserPostCommentReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferingUserPostCommentReaction" ADD CONSTRAINT "OfferingUserPostCommentReaction_offeringPostCommentId_fkey" FOREIGN KEY ("offeringPostCommentId") REFERENCES "OfferingUserPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
