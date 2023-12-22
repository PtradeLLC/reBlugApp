/*
  Warnings:

  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `UserType` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserType" DROP CONSTRAINT "UserType_accountId_fkey";

-- DropForeignKey
ALTER TABLE "UserType" DROP CONSTRAINT "UserType_userId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "UserType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Social" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserType";

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
