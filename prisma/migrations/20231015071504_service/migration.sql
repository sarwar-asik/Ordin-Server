-- CreateEnum
CREATE TYPE "serviceStatus" AS ENUM ('upcoming', 'available', 'sold');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "status" "serviceStatus" NOT NULL DEFAULT 'upcoming';
