/*
  Warnings:

  - Added the required column `location` to the `SectionResource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionResource" ADD COLUMN     "location" TEXT NOT NULL;
