-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "EmailTool" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "Marketing_Creatives_Document" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "Marketing_Plan_Document" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "Trends_Document" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "embedding" vector(1536);

-- AlterTable
ALTER TABLE "emailList" ADD COLUMN     "embedding" vector(1536);
