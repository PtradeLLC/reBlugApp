/*
  Warnings:

  - You are about to drop the column `title` on the `Dish` table. All the data in the column will be lost.
  - Added the required column `name` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_menuId_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "menuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
