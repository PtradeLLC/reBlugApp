/*
  Warnings:

  - You are about to drop the column `tool0` on the `ProductLaunchData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductLaunchData" DROP COLUMN "tool0",
ADD COLUMN     "tool04" TEXT;

-- AddForeignKey
ALTER TABLE "ProductLaunchData" ADD CONSTRAINT "ProductLaunchData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
