/*
  Warnings:

  - You are about to drop the column `body` on the `UserPostCommentReaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SectionResource" ALTER COLUMN "type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserPostCommentReaction" DROP COLUMN "body";
