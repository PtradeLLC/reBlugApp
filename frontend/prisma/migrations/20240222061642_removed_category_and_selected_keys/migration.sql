/*
  Warnings:

  - You are about to drop the `SelectedKeys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_selectedKeysId_fkey";

-- DropTable
DROP TABLE "SelectedKeys";
