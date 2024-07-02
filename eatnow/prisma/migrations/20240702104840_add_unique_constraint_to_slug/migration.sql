/*
  Warnings:

  - You are about to drop the column `name` on the `Dish` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dishId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Dish_slug_key" ON "Dish"("slug");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
