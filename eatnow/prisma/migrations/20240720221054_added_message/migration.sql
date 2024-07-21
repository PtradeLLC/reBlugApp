/*
  Warnings:

  - You are about to drop the `Sponsors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_postId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "messageId" TEXT;

-- DropTable
DROP TABLE "Sponsors";

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "postId" TEXT,
    "submissionId" TEXT,
    "userId" TEXT,
    "messageId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "brandName" TEXT,
    "productName" TEXT,
    "productImage" TEXT,
    "website" TEXT,
    "productMesage" TEXT,
    "notes" TEXT,
    "postId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_id_key" ON "Sponsor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
