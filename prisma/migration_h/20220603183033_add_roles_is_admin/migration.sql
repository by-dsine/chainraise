/*
  Warnings:

  - Added the required column `isAdmin` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RolePermission" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL;
