/*
  Warnings:

  - You are about to drop the column `url` on the `ForgedAI` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ForgedAI" DROP COLUMN "url",
ADD COLUMN     "title" TEXT;
