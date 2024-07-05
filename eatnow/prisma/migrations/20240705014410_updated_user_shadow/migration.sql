/*
  Warnings:

  - You are about to drop the column `userId` on the `Niche` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_userId_fkey";

-- DropIndex
DROP INDEX "Niche_userId_key";

-- AlterTable
ALTER TABLE "Niche" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserShadow" (
    "id" SERIAL NOT NULL,
    "nicheId" INTEGER,

    CONSTRAINT "UserShadow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE SET NULL ON UPDATE CASCADE;
