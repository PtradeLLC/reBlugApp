/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
DROP COLUMN "slug",
DROP COLUMN "submissionId";

-- AlterTable
ALTER TABLE "SelectedKeys" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "SelectedKeys" ADD CONSTRAINT "SelectedKeys_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
