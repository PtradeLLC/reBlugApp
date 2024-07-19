-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "podcastMultiCast" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "podcastSingleCast" BOOLEAN NOT NULL DEFAULT false;
