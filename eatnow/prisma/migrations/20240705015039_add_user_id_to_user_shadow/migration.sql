/*
  Warnings:

  - You are about to drop the column `nicheId` on the `UserShadow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Niche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserShadow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Niche` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserShadow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserShadow" DROP CONSTRAINT "UserShadow_nicheId_fkey";

-- AlterTable
ALTER TABLE "Niche" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserShadow" DROP COLUMN "nicheId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Niche_userId_key" ON "Niche"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserShadow_userId_key" ON "UserShadow"("userId");

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserShadow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
