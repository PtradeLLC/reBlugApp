/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postBody` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postSlug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
DROP COLUMN "postBody",
DROP COLUMN "slug",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "crossPromote" TEXT,
ADD COLUMN     "featureImage" TEXT,
ADD COLUMN     "postSlug" TEXT,
ADD COLUMN     "selectedFeatures" TEXT[],
ADD COLUMN     "selectedKeysId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "SelectedKeys" (
    "id" SERIAL NOT NULL,
    "anchorKey" TEXT NOT NULL,
    "currentKey" TEXT NOT NULL,

    CONSTRAINT "SelectedKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_postSlug_key" ON "Post"("postSlug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_selectedKeysId_fkey" FOREIGN KEY ("selectedKeysId") REFERENCES "SelectedKeys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
