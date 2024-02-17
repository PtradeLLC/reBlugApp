-- CreateTable
CREATE TABLE "AiResponse" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "commentBy" TEXT,
    "commentingSystemId" TEXT,
    "articleCommentId" TEXT,

    CONSTRAINT "AiResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_articleCommentId_fkey" FOREIGN KEY ("articleCommentId") REFERENCES "ArticleComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
