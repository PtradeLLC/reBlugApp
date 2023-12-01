/*
  Warnings:

  - You are about to drop the column `role` on the `emailList` table. All the data in the column will be lost.
  - Made the column `teamId` on table `emailList` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "emailList" DROP CONSTRAINT "emailList_teamId_fkey";

-- DropIndex
DROP INDEX "emailList_teamId_key";

-- AlterTable
ALTER TABLE "emailList" DROP COLUMN "role",
ALTER COLUMN "teamId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "emailList" ADD CONSTRAINT "emailList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
