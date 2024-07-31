/*
  Warnings:

  - Made the column `postId` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Draft` required. This step will fail if there are existing NULL values in that column.

*/
-- Update existing NULL values to valid IDs
UPDATE "Draft" SET "postId" = 'validPostId' WHERE "postId" IS NULL;
UPDATE "Draft" SET "userId" = 'validUserId' WHERE "userId" IS NULL;

-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_postId_fkey";

-- DropForeignKey
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_userId_fkey";

-- DropIndex
DROP INDEX "Draft_postId_key";

-- AlterTable
ALTER TABLE "Draft" ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Draft_userId_idx" ON "Draft"("userId");

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
