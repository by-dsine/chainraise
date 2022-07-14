/*
  Warnings:

  - You are about to drop the column `documentName` on the `ProfileDocument` table. All the data in the column will be lost.
  - You are about to drop the column `visible` on the `ProfileDocument` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProfileDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileDocument" DROP COLUMN "documentName",
DROP COLUMN "visible",
ADD COLUMN     "name" TEXT NOT NULL;
