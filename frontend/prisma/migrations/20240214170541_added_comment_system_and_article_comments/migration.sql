/*
  Warnings:

  - You are about to drop the column `comments` on the `CommentingSystem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CommentingSystem_id_key";

-- AlterTable
ALTER TABLE "CommentingSystem" DROP COLUMN "comments",
ADD COLUMN     "title" TEXT,
ADD CONSTRAINT "CommentingSystem_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ArticleComment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "commentingSystemId" TEXT,

    CONSTRAINT "ArticleComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_commentingSystemId_fkey" FOREIGN KEY ("commentingSystemId") REFERENCES "CommentingSystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
