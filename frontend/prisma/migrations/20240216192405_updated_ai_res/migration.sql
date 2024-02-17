/*
  Warnings:

  - You are about to drop the column `comment` on the `AiResponse` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `AiResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiResponse" DROP COLUMN "comment",
DROP COLUMN "title";
