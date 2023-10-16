/*
  Warnings:

  - A unique constraint covering the columns `[userId,serviceId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_serviceId_key" ON "Booking"("userId", "serviceId");
