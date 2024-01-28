/*
  Warnings:

  - The values [Blogger] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marketing_Creatives_Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marketing_Plan_Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trends_Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'MANAGER', 'MEMBER', 'ADMIN', 'BLOGGER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Team" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "Team" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'MANAGER';
ALTER TABLE "Team" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_connectorsId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_contactListId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_emailToolId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_knowledgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Creatives_Document" DROP CONSTRAINT "Marketing_Creatives_Document_creativesId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Plan_Document" DROP CONSTRAINT "Marketing_Plan_Document_planId_fkey";

-- DropForeignKey
ALTER TABLE "Trends_Document" DROP CONSTRAINT "Trends_Document_iaId_fkey";

-- AlterTable
ALTER TABLE "Blogger" ADD COLUMN     "BloggerId" TEXT;

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "Marketing_Creatives_Document";

-- DropTable
DROP TABLE "Marketing_Plan_Document";

-- DropTable
DROP TABLE "Trends_Document";

-- CreateTable
CREATE TABLE "ProductLaunchData" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "feature01" TEXT,
    "title" TEXT,
    "feature02" TEXT,
    "feature03" TEXT,
    "demographic" TEXT,
    "company" TEXT,
    "geographic" TEXT,
    "job_title" TEXT,
    "about" TEXT,
    "objectives" TEXT,
    "client_type" TEXT,
    "pain_point01" TEXT,
    "pain_point02" TEXT,
    "pain_point03" TEXT,
    "pain_point04" TEXT,
    "unique01" TEXT,
    "unique02" TEXT,
    "unique03" TEXT,
    "unique04" TEXT,
    "tool01" TEXT,
    "tool02" TEXT,
    "tool03" TEXT,
    "tool0" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductLaunchData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailContact" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "EmailContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "emailToolId" TEXT,
    "embedding" vector(1536),
    "campaignId" TEXT,
    "connectorsId" TEXT,
    "filename" TEXT,
    "knowledgeBaseId" TEXT,
    "contactListId" TEXT,
    "userId" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trends_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "iaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" vector(1536)
);

-- CreateTable
CREATE TABLE "Marketing_Plan_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "planId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" vector(1536)
);

-- CreateTable
CREATE TABLE "Marketing_Creatives_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "creativesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" vector(1536)
);

-- CreateIndex
CREATE UNIQUE INDEX "Trends_files_id_key" ON "Trends_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_Plan_files_id_key" ON "Marketing_Plan_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_Creatives_files_id_key" ON "Marketing_Creatives_files"("id");

-- AddForeignKey
ALTER TABLE "EmailContact" ADD CONSTRAINT "EmailContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_emailToolId_fkey" FOREIGN KEY ("emailToolId") REFERENCES "EmailTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_connectorsId_fkey" FOREIGN KEY ("connectorsId") REFERENCES "Connectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "KnowledgeBase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_contactListId_fkey" FOREIGN KEY ("contactListId") REFERENCES "ContactList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trends_files" ADD CONSTRAINT "Trends_files_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_files" ADD CONSTRAINT "Marketing_Plan_files_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_files" ADD CONSTRAINT "Marketing_Creatives_files_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
