-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "accreditationStatus" TEXT DEFAULT E'Not Started',
ADD COLUMN     "kycStatus" TEXT DEFAULT E'Not Started';
