/*
  Warnings:

  - You are about to drop the `ForgedAI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Marketing_Creatives_Document" DROP CONSTRAINT "Marketing_Creatives_Document_creativesId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Plan_Document" DROP CONSTRAINT "Marketing_Plan_Document_planId_fkey";

-- DropForeignKey
ALTER TABLE "Trends_Document" DROP CONSTRAINT "Trends_Document_iaId_fkey";

-- DropTable
DROP TABLE "ForgedAI";
