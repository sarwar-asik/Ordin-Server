/*
  Warnings:

  - The `servicetime` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'reject';

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "paymentStatus" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "servicetime",
ADD COLUMN     "servicetime" TIMESTAMP(3);
