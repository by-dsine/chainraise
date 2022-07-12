-- AlterTable
ALTER TABLE "OrganizationMembership" ADD COLUMN     "name" TEXT,
ALTER COLUMN "profileId" DROP NOT NULL;
