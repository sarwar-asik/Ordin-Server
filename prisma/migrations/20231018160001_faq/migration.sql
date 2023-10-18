/*
  Warnings:

  - The primary key for the `FAQ` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FAQ" DROP CONSTRAINT "FAQ_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FAQ_id_seq";
