/*
  Warnings:

  - The primary key for the `Niche` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Niche` table. All the data in the column will be lost.
  - The primary key for the `UserShadow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,nicheId]` on the table `UserShadow` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nicheId` on table `UserShadow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserShadow" DROP CONSTRAINT "UserShadow_nicheId_fkey";

-- DropIndex
DROP INDEX "UserShadow_userId_key";

-- AlterTable
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_pkey",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Niche_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Niche_id_seq";

-- AlterTable
ALTER TABLE "UserShadow" DROP CONSTRAINT "UserShadow_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "nicheId" SET NOT NULL,
ALTER COLUMN "nicheId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserShadow_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserShadow_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "UserShadow_userId_nicheId_key" ON "UserShadow"("userId", "nicheId");

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
