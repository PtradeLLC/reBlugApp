/*
  Warnings:

  - You are about to drop the column `productMesage` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "productMesage",
ADD COLUMN     "productMessage" TEXT;
