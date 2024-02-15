/*
  Warnings:

  - You are about to drop the column `user` on the `ArticleComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleComment" DROP COLUMN "user",
ADD COLUMN     "commentBy" TEXT;
