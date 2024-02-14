-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CommentingSystem" (
    "id" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "submissionId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Submission_id_key" ON "Submission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentingSystem_id_key" ON "CommentingSystem"("id");

-- AddForeignKey
ALTER TABLE "CommentingSystem" ADD CONSTRAINT "CommentingSystem_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
