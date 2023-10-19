/*
  Warnings:

  - You are about to drop the column `userId` on the `FAQ` table. All the data in the column will be lost.
  - Made the column `question` on table `FAQ` required. This step will fail if there are existing NULL values in that column.
  - Made the column `answer` on table `FAQ` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FAQ" DROP CONSTRAINT "FAQ_userId_fkey";

-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "userId",
ALTER COLUMN "question" SET NOT NULL,
ALTER COLUMN "answer" SET NOT NULL;
