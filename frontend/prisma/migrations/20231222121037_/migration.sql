/*
  Warnings:

  - You are about to drop the column `twiter` on the `Social` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "twiter",
ADD COLUMN     "twitter" TEXT;

-- CreateTable
CREATE TABLE "UserType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserType_id_key" ON "UserType"("id");

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
