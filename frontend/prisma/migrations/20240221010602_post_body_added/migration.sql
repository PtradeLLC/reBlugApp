-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postBody" TEXT;

-- CreateTable
CREATE TABLE "Sponsors" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "postId" TEXT,
    "submissionId" TEXT,

    CONSTRAINT "Sponsors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
