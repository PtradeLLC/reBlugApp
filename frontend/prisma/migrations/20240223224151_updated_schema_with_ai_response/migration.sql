/*
  Warnings:

  - A unique constraint covering the columns `[articleCommentId]` on the table `AiResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AiResponse" ADD COLUMN     "postId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_articleCommentId_key" ON "AiResponse"("articleCommentId");

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
