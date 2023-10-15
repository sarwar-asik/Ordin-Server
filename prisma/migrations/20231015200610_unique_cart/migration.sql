/*
  Warnings:

  - A unique constraint covering the columns `[userId,serviceId]` on the table `UserCart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCart_userId_serviceId_key" ON "UserCart"("userId", "serviceId");
