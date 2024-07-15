/*
  Warnings:

  - You are about to drop the `PublishedChannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublishedChannels" DROP CONSTRAINT "PublishedChannels_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishedChannels" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "PublishedChannels";
