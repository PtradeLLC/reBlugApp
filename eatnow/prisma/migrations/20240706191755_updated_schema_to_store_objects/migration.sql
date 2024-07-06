/*
  Warnings:

  - You are about to drop the column `userId` on the `Niche` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Niche` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_userId_fkey";

-- DropIndex
DROP INDEX "Niche_userId_key";

-- AlterTable
ALTER TABLE "Niche" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UserShadow" ADD COLUMN     "nicheId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Niche_name_key" ON "Niche"("name");

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE SET NULL ON UPDATE CASCADE;
