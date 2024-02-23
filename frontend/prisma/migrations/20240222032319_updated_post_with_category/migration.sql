/*
  Warnings:

  - You are about to drop the column `categoryId` on the `SelectedKeys` table. All the data in the column will be lost.
  - Made the column `name` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SelectedKeys" DROP CONSTRAINT "SelectedKeys_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "SelectedKeys" DROP COLUMN "categoryId";
