/*
  Warnings:

  - The values [BLOGGER,RESTAURANT,SOCIAL_MEDIA_PARTNER,BRAND_MARKETER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `emailBody` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `productDescritption` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `productImage` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `productUrl` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `subjectLine` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `aiResponse` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `postSlug` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `aiResponse` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postSlug` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ContactList` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `EmailList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `EmailList` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `emailBody` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `productDescritption` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `productImage` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `productUrl` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `subjectLine` on the `EmailTool` table. All the data in the column will be lost.
  - You are about to drop the column `campaignId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `connectorsId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `contactListId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `emailToolId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `knowledgeBaseId` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `KnowledgeBase` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `KnowledgeBase` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `KnowledgeBase` table. All the data in the column will be lost.
  - You are about to drop the column `BloggerId` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `google` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `twitch` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Sponsors` table. All the data in the column will be lost.
  - You are about to drop the `Blogger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Connectors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForgedAI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaaP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marketing_Creatives_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marketing_Plan_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trends_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrialProspect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrialProspectTwo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ContactList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sponsors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN', 'MEMBER', 'MANAGER');
ALTER TABLE "Team" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "Team" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Team" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'MANAGER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_userId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Connectors" DROP CONSTRAINT "Connectors_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Connectors" DROP CONSTRAINT "Connectors_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactList" DROP CONSTRAINT "ContactList_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmailList" DROP CONSTRAINT "EmailList_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmailTool" DROP CONSTRAINT "EmailTool_userId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_connectorsId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_contactListId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_emailToolId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_knowledgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeBase" DROP CONSTRAINT "KnowledgeBase_userId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Creatives_files" DROP CONSTRAINT "Marketing_Creatives_files_creativesId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Plan_files" DROP CONSTRAINT "Marketing_Plan_files_planId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_BloggerId_fkey";

-- DropForeignKey
ALTER TABLE "Trends_files" DROP CONSTRAINT "Trends_files_iaId_fkey";

-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "category",
DROP COLUMN "email",
DROP COLUMN "emailBody",
DROP COLUMN "productDescritption",
DROP COLUMN "productImage",
DROP COLUMN "productUrl",
DROP COLUMN "subjectLine",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "aiResponse",
DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "postSlug",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
DROP COLUMN "userEmail";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "aiResponse",
DROP COLUMN "postSlug",
DROP COLUMN "title",
DROP COLUMN "userEmail",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ContactList" DROP COLUMN "createdAt",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "url",
DROP COLUMN "userId",
ADD COLUMN     "UserId" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emailToolId" TEXT;

-- AlterTable
ALTER TABLE "EmailList" DROP COLUMN "email",
DROP COLUMN "userId",
ADD COLUMN     "UserId" TEXT,
ADD COLUMN     "emailToolId" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "EmailTool" DROP COLUMN "email",
DROP COLUMN "emailBody",
DROP COLUMN "productDescritption",
DROP COLUMN "productImage",
DROP COLUMN "productUrl",
DROP COLUMN "subjectLine",
ADD COLUMN     "data" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "campaignId",
DROP COLUMN "connectorsId",
DROP COLUMN "contactListId",
DROP COLUMN "emailToolId",
DROP COLUMN "filename",
DROP COLUMN "knowledgeBaseId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "teamId" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "KnowledgeBase" DROP COLUMN "email",
DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "data" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "BloggerId",
DROP COLUMN "facebook",
DROP COLUMN "google",
DROP COLUMN "tiktok",
DROP COLUMN "twitch",
DROP COLUMN "twitter",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "profile" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "Sponsors" DROP COLUMN "title",
ADD COLUMN     "amount" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "sponsoredPostId" TEXT,
ADD COLUMN     "teamId" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referralCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "Blogger";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Connectors";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "ForgedAI";

-- DropTable
DROP TABLE "MaaP";

-- DropTable
DROP TABLE "Marketing_Creatives_files";

-- DropTable
DROP TABLE "Marketing_Plan_files";

-- DropTable
DROP TABLE "Trends_files";

-- DropTable
DROP TABLE "TrialProspect";

-- DropTable
DROP TABLE "TrialProspectTwo";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDish" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderDish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "menuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- RenameForeignKey
ALTER TABLE "Sponsors" RENAME CONSTRAINT "Sponsors_userId_fkey" TO "Sponsors_userId_fkey2";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Social"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_emailToolId_fkey" FOREIGN KEY ("emailToolId") REFERENCES "EmailTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_emailToolId_fkey" FOREIGN KEY ("emailToolId") REFERENCES "EmailTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
