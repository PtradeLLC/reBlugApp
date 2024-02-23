/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ArticleComment` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleComment" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryId";
