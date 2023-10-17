/*
  Warnings:

  - You are about to drop the column `details` on the `Review` table. All the data in the column will be lost.
  - Made the column `rating` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "details",
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "reviews" TEXT,
ADD COLUMN     "suggestions" TEXT,
ALTER COLUMN "rating" SET NOT NULL;
