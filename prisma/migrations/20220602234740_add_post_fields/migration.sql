/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
ALTER COLUMN "followerId" SET DATA TYPE TEXT,
ALTER COLUMN "followingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followingId");

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserProfile_id_seq";

-- CreateTable
CREATE TABLE "UserPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPostComment" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "UserPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPostReaction" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "postId" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,

    CONSTRAINT "UserPostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPostCommentReaction" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,

    CONSTRAINT "UserPostCommentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReaction" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "UserReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostComment" ADD CONSTRAINT "UserPostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostComment" ADD CONSTRAINT "UserPostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "UserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "UserPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostReaction" ADD CONSTRAINT "UserPostReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostCommentReaction" ADD CONSTRAINT "UserPostCommentReaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostCommentReaction" ADD CONSTRAINT "UserPostCommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "UserPostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostCommentReaction" ADD CONSTRAINT "UserPostCommentReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "UserReaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
