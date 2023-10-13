/*
  Warnings:

  - You are about to drop the column `servicetime` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Catergories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title,price]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "servicetime",
ADD COLUMN     "serviceTime" TIMESTAMP(3);

-- DropTable
DROP TABLE "Catergories";

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_title_price_key" ON "Service"("title", "price");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
