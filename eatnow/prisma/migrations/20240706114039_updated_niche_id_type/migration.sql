/*
  Warnings:

  - Changed the type of `userId` on the `UserShadow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserShadow" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserShadow_userId_key" ON "UserShadow"("userId");
