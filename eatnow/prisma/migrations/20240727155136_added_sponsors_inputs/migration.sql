/*
  Warnings:

  - You are about to drop the column `title` on the `Sponsor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "title",
ADD COLUMN     "brandName" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "product" TEXT,
ADD COLUMN     "productDesc" TEXT,
ADD COLUMN     "website" TEXT;
