/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `AiResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AiResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `commentingSystemId` column on the `AiResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `articleCommentId` column on the `AiResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postId` column on the `AiResponse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Blogger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `CampaignHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `CampaignHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Connectors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `Connectors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `ContactList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `ContactList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EmailContact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EmailContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `EmailContact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `EmailTool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `EmailTool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `ForgedAI` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `campaignHistoryId` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recentUpdatesId` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `KnowledgeBase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `KnowledgeBase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `MaaP` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Marketing_Creatives_files` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Marketing_Plan_files` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Category` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postSlug` on the `Post` table. All the data in the column will be lost.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductLaunchData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductLaunchData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `ProductLaunchData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `RecentUpdates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `RecentUpdates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Social` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `BloggerId` column on the `Social` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `Social` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sponsors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Sponsors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postId` column on the `Sponsors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `submissionId` column on the `Sponsors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Submission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `Team` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Trends_files` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id` column on the `Update` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recentUpdatesId` column on the `Update` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `embedding` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `VerificationToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teamId` column on the `VerificationToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `CommentingSystem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emailList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Campaign` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Connectors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `ContactList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `EmailTool` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `KnowledgeBase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `creativesId` on the `Marketing_Creatives_files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `planId` on the `Marketing_Plan_files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `iaId` on the `Trends_files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `VerificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_articleCommentId_fkey";

-- DropForeignKey
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_postId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_userId_fkey";

-- DropForeignKey
ALTER TABLE "CampaignHistory" DROP CONSTRAINT "CampaignHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentingSystem" DROP CONSTRAINT "CommentingSystem_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Connectors" DROP CONSTRAINT "Connectors_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Connectors" DROP CONSTRAINT "Connectors_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactList" DROP CONSTRAINT "ContactList_teamId_fkey";

-- DropForeignKey
ALTER TABLE "ContactList" DROP CONSTRAINT "ContactList_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmailContact" DROP CONSTRAINT "EmailContact_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmailTool" DROP CONSTRAINT "EmailTool_teamId_fkey";

-- DropForeignKey
ALTER TABLE "EmailTool" DROP CONSTRAINT "EmailTool_userId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_campaignHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_recentUpdatesId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeBase" DROP CONSTRAINT "KnowledgeBase_teamId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeBase" DROP CONSTRAINT "KnowledgeBase_userId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Creatives_files" DROP CONSTRAINT "Marketing_Creatives_files_creativesId_fkey";

-- DropForeignKey
ALTER TABLE "Marketing_Plan_files" DROP CONSTRAINT "Marketing_Plan_files_planId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductLaunchData" DROP CONSTRAINT "ProductLaunchData_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecentUpdates" DROP CONSTRAINT "RecentUpdates_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_BloggerId_fkey";

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_postId_fkey";

-- DropForeignKey
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Trends_files" DROP CONSTRAINT "Trends_files_iaId_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_recentUpdatesId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_teamId_fkey";

-- DropForeignKey
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "emailList" DROP CONSTRAINT "emailList_teamId_fkey";

-- DropForeignKey
ALTER TABLE "emailList" DROP CONSTRAINT "emailList_userId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_connectorsId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_contactListId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_emailToolId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_knowledgeBaseId_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_userId_fkey";

-- DropIndex
DROP INDEX "Blogger_id_key";

-- DropIndex
DROP INDEX "Brand_id_key";

-- DropIndex
DROP INDEX "Campaign_id_key";

-- DropIndex
DROP INDEX "CampaignHistory_id_key";

-- DropIndex
DROP INDEX "Connectors_id_key";

-- DropIndex
DROP INDEX "Contact_id_key";

-- DropIndex
DROP INDEX "ContactList_id_key";

-- DropIndex
DROP INDEX "EmailTool_id_key";

-- DropIndex
DROP INDEX "Event_id_key";

-- DropIndex
DROP INDEX "ForgedAI_id_key";

-- DropIndex
DROP INDEX "History_id_key";

-- DropIndex
DROP INDEX "KnowledgeBase_id_key";

-- DropIndex
DROP INDEX "MaaP_id_key";

-- DropIndex
DROP INDEX "Marketing_Creatives_files_id_key";

-- DropIndex
DROP INDEX "Marketing_Plan_files_id_key";

-- DropIndex
DROP INDEX "Post_postSlug_key";

-- DropIndex
DROP INDEX "RecentUpdates_id_key";

-- DropIndex
DROP INDEX "Social_id_key";

-- DropIndex
DROP INDEX "Submission_id_key";

-- DropIndex
DROP INDEX "Team_id_key";

-- DropIndex
DROP INDEX "Trends_files_id_key";

-- DropIndex
DROP INDEX "Update_id_key";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "commentingSystemId",
ADD COLUMN     "commentingSystemId" INTEGER,
DROP COLUMN "articleCommentId",
ADD COLUMN     "articleCommentId" INTEGER,
DROP COLUMN "postId",
ADD COLUMN     "postId" INTEGER,
ADD CONSTRAINT "AiResponse_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Blogger" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Blogger_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CampaignHistory" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "CampaignHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Connectors" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "Connectors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ContactList" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "ContactList_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EmailContact" DROP CONSTRAINT "EmailContact_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "EmailContact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EmailTool" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "EmailTool_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ForgedAI" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ForgedAI_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "History" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "campaignHistoryId",
ADD COLUMN     "campaignHistoryId" INTEGER,
DROP COLUMN "recentUpdatesId",
ADD COLUMN     "recentUpdatesId" INTEGER,
ADD CONSTRAINT "History_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KnowledgeBase" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "KnowledgeBase_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MaaP" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MaaP_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Marketing_Creatives_files" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "creativesId",
ADD COLUMN     "creativesId" INTEGER NOT NULL,
ADD CONSTRAINT "Marketing_Creatives_files_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Marketing_Plan_files" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "planId",
ADD COLUMN     "planId" INTEGER NOT NULL,
ADD CONSTRAINT "Marketing_Plan_files_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "Category",
DROP COLUMN "desc",
DROP COLUMN "postSlug",
ADD COLUMN     "blogger" TEXT,
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "categorySlug" TEXT,
ADD COLUMN     "contentImage" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "paramsId" TEXT,
ADD COLUMN     "slug" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductLaunchData" DROP CONSTRAINT "ProductLaunchData_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "ProductLaunchData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RecentUpdates" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "RecentUpdates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "BloggerId",
ADD COLUMN     "BloggerId" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "Social_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sponsors" DROP CONSTRAINT "Sponsors_pkey",
ADD COLUMN     "userId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "postId",
ADD COLUMN     "postId" INTEGER,
DROP COLUMN "submissionId",
ADD COLUMN     "submissionId" INTEGER,
ADD CONSTRAINT "Sponsors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trends_files" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "iaId",
ADD COLUMN     "iaId" INTEGER NOT NULL,
ADD CONSTRAINT "Trends_files_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "recentUpdatesId",
ADD COLUMN     "recentUpdatesId" INTEGER,
ADD CONSTRAINT "Update_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "embedding",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER,
ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "CommentingSystem";

-- DropTable
DROP TABLE "Comments";

-- DropTable
DROP TABLE "emailList";

-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageOnPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "ImageOnPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarOnPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "avatarId" TEXT NOT NULL,

    CONSTRAINT "AvatarOnPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "slug" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postSlug" TEXT,
    "aiResponse" TEXT,
    "postId" INTEGER,
    "userEmail" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "emailToolId" INTEGER,
    "embedding" vector(1536),
    "campaignId" INTEGER,
    "connectorsId" INTEGER,
    "filename" TEXT,
    "knowledgeBaseId" INTEGER,
    "contactListId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER,
    "teamId" INTEGER NOT NULL,
    "embedding" vector(1536),

    CONSTRAINT "EmailList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_articleCommentId_key" ON "AiResponse"("articleCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_token_key" ON "VerificationToken"("userId", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentUpdates" ADD CONSTRAINT "RecentUpdates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignHistory" ADD CONSTRAINT "CampaignHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_recentUpdatesId_fkey" FOREIGN KEY ("recentUpdatesId") REFERENCES "RecentUpdates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_campaignHistoryId_fkey" FOREIGN KEY ("campaignHistoryId") REFERENCES "CampaignHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_recentUpdatesId_fkey" FOREIGN KEY ("recentUpdatesId") REFERENCES "RecentUpdates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLaunchData" ADD CONSTRAINT "ProductLaunchData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailContact" ADD CONSTRAINT "EmailContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOnPost" ADD CONSTRAINT "ImageOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOnPost" ADD CONSTRAINT "ImageOnPost_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarOnPost" ADD CONSTRAINT "AvatarOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_articleCommentId_fkey" FOREIGN KEY ("articleCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsors" ADD CONSTRAINT "Sponsors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connectors" ADD CONSTRAINT "Connectors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connectors" ADD CONSTRAINT "Connectors_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_emailToolId_fkey" FOREIGN KEY ("emailToolId") REFERENCES "EmailTool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_connectorsId_fkey" FOREIGN KEY ("connectorsId") REFERENCES "Connectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_knowledgeBaseId_fkey" FOREIGN KEY ("knowledgeBaseId") REFERENCES "KnowledgeBase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_contactListId_fkey" FOREIGN KEY ("contactListId") REFERENCES "ContactList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_BloggerId_fkey" FOREIGN KEY ("BloggerId") REFERENCES "Blogger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trends_files" ADD CONSTRAINT "Trends_files_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_files" ADD CONSTRAINT "Marketing_Plan_files_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_files" ADD CONSTRAINT "Marketing_Creatives_files_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
