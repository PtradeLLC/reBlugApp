/*
  Warnings:

  - You are about to drop the column `name` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `emailToolId` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `EmailList` table. All the data in the column will be lost.
  - You are about to drop the column `emailToolId` on the `EmailList` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EmailList` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `KnowledgeBase` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `sponsoredPostId` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the `Dish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderDish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Campaign` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ContactList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ContactList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `EmailList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `EmailTool` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `EmailTool` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `KnowledgeBase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'BLOGGER';
ALTER TYPE "Role" ADD VALUE 'RESTAURANT';
ALTER TYPE "Role" ADD VALUE 'SOCIAL_MEDIA_PARTNER';
ALTER TYPE "Role" ADD VALUE 'BRAND_MARKETER';

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactList" DROP CONSTRAINT "ContactList_UserId_fkey";

-- DropForeignKey
ALTER TABLE "ContactList" DROP CONSTRAINT "ContactList_emailToolId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_menuId_fkey";

-- DropForeignKey
ALTER TABLE "EmailList" DROP CONSTRAINT "EmailList_UserId_fkey";

-- DropForeignKey
ALTER TABLE "EmailList" DROP CONSTRAINT "EmailList_emailToolId_fkey";

-- DropForeignKey
ALTER TABLE "EmailTool" DROP CONSTRAINT "EmailTool_userId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_postId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_teamId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeBase" DROP CONSTRAINT "KnowledgeBase_userId_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDish" DROP CONSTRAINT "OrderDish_dishId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDish" DROP CONSTRAINT "OrderDish_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_postId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_userId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "name",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailBody" TEXT,
ADD COLUMN     "productDescritption" TEXT,
ADD COLUMN     "productImage" TEXT,
ADD COLUMN     "productUrl" TEXT,
ADD COLUMN     "subjectLine" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "aiResponse" TEXT,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postSlug" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userEmail" TEXT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "aiResponse" TEXT,
ADD COLUMN     "postSlug" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "userEmail" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ContactList" DROP COLUMN "UserId",
DROP COLUMN "email",
DROP COLUMN "emailToolId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmailList" DROP COLUMN "UserId",
DROP COLUMN "emailToolId",
DROP COLUMN "type",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "EmailTool" DROP COLUMN "data",
DROP COLUMN "type",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailBody" TEXT,
ADD COLUMN     "productDescritption" TEXT,
ADD COLUMN     "productImage" TEXT,
ADD COLUMN     "productUrl" TEXT,
ADD COLUMN     "subjectLine" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "teamId",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "url",
ADD COLUMN     "campaignId" TEXT,
ADD COLUMN     "connectorsId" TEXT,
ADD COLUMN     "contactListId" TEXT,
ADD COLUMN     "emailToolId" TEXT,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "knowledgeBaseId" TEXT;

-- AlterTable
ALTER TABLE "KnowledgeBase" DROP COLUMN "data",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "postId",
DROP COLUMN "profile",
DROP COLUMN "profileImage",
DROP COLUMN "teamId",
ADD COLUMN     "BloggerId" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "google" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitch" TEXT,
ADD COLUMN     "twitter" TEXT;

-- AlterTable
ALTER TABLE "Sponsors" DROP COLUMN "amount",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "sponsoredPostId",
DROP COLUMN "teamId",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "Dish";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderDish";

-- DropTable
DROP TABLE "Restaurant";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "Connectors" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subjectLine" TEXT,
    "emailBody" TEXT,
    "productImage" TEXT,
    "productDescritption" TEXT,
    "productUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT
);

-- CreateTable
CREATE TABLE "TrialProspect" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "Email" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "TrialProspectTwo" (
    "id" TEXT NOT NULL,
    "emai" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "Email" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "ForgedAI" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "useCaseTwo" TEXT NOT NULL,
    "useCase" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Blogger" (
    "id" TEXT NOT NULL,
    "BloggerId" TEXT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MaaP" (
    "id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trends_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "iaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Marketing_Plan_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "planId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Marketing_Creatives_files" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT,
    "creativesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Connectors_id_key" ON "Connectors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TrialProspect_id_key" ON "TrialProspect"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TrialProspectTwo_id_key" ON "TrialProspectTwo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ForgedAI_id_key" ON "ForgedAI"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blogger_id_key" ON "Blogger"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MaaP_id_key" ON "MaaP"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Trends_files_id_key" ON "Trends_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_Plan_files_id_key" ON "Marketing_Plan_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Marketing_Creatives_files_id_key" ON "Marketing_Creatives_files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- RenameForeignKey
ALTER TABLE "Sponsors" RENAME CONSTRAINT "Sponsors_userId_fkey2" TO "Sponsors_userId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connectors" ADD CONSTRAINT "Connectors_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connectors" ADD CONSTRAINT "Connectors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_connectorsId_fkey" FOREIGN KEY ("connectorsId") REFERENCES "Connectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_contactListId_fkey" FOREIGN KEY ("contactListId") REFERENCES "ContactList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_emailToolId_fkey" FOREIGN KEY ("emailToolId") REFERENCES "EmailTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "KnowledgeBase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_BloggerId_fkey" FOREIGN KEY ("BloggerId") REFERENCES "Blogger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trends_files" ADD CONSTRAINT "Trends_files_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_files" ADD CONSTRAINT "Marketing_Plan_files_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_files" ADD CONSTRAINT "Marketing_Creatives_files_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
