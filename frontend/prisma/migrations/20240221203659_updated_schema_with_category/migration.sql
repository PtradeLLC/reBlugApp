/*
  Warnings:

  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - The `views` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "title",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
