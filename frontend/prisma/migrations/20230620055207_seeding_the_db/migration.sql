/*
  Warnings:

  - The `content` column on the `ForgedAI` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `creativesId` to the `Marketing_Creatives_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Marketing_Plan_Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iaId` to the `Trends_Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ForgedAI" DROP COLUMN "content",
ADD COLUMN     "content" TEXT[],
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Marketing_Creatives_Document" ADD COLUMN     "creativesId" TEXT NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Marketing_Plan_Document" ADD COLUMN     "planId" TEXT NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trends_Document" ADD COLUMN     "iaId" TEXT NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trends_Document" ADD CONSTRAINT "Trends_Document_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_Document" ADD CONSTRAINT "Marketing_Plan_Document_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_Document" ADD CONSTRAINT "Marketing_Creatives_Document_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
