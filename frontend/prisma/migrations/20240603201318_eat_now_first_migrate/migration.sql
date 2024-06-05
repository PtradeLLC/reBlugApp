-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'MEMBER', 'ADMIN', 'BLOGGER');

-- DropEnum
DROP TYPE "crdb_internal_region";

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    "api_domain" STRING,
    "UserType" STRING
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "userId" INT4,
    "name" STRING,
    "externalId" STRING,
    "brandName" STRING,
    "firstName" STRING,
    "profileImage" STRING,
    "isActive" BOOL NOT NULL DEFAULT false,
    "brandLogo" STRING,
    "password" STRING,
    "image" STRING,
    "lastName" STRING,
    "isVerified" BOOL,
    "provider" STRING,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" STRING,
    "role" "Role" NOT NULL DEFAULT 'MANAGER',
    "emailVerified" TIMESTAMP(3),
    "userType" STRING
);

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "title" STRING,
    "featureImage" STRING,
    "contentImage" STRING,
    "views" INT4 NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" STRING,
    "crossPromote" STRING,
    "slug" STRING,
    "selectedValue" STRING,
    "paramsId" STRING,
    "image" STRING,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "selectedFeatures" STRING[],
    "published" BOOL NOT NULL DEFAULT false,
    "content" STRING,
    "email" STRING,
    "author" STRING,
    "categorySlug" STRING,
    "blogger" STRING,
    "userId" STRING,
    "postSlug" STRING,
    "categoryId" STRING
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "token" STRING NOT NULL,
    "email" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "RecentUpdates" (
    "id" STRING NOT NULL,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "CampaignHistory" (
    "id" STRING NOT NULL,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "Update" (
    "id" STRING NOT NULL,
    "Update" STRING,
    "recentUpdatesId" STRING
);

-- CreateTable
CREATE TABLE "History" (
    "id" STRING NOT NULL,
    "History" STRING,
    "campaignHistoryId" STRING,
    "recentUpdatesId" STRING
);

-- CreateTable
CREATE TABLE "Team" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "name" STRING,
    "firstName" STRING,
    "lastName" STRING,
    "isVerified" BOOL,
    "password" STRING,
    "image" STRING,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" STRING,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "ProductLaunchData" (
    "id" STRING NOT NULL,
    "userId" STRING,
    "feature01" STRING,
    "title" STRING,
    "feature02" STRING,
    "feature03" STRING,
    "demographic" STRING,
    "company" STRING,
    "geographic" STRING,
    "job_title" STRING,
    "about" STRING,
    "objectives" STRING,
    "client_type" STRING,
    "pain_point01" STRING,
    "pain_point02" STRING,
    "pain_point03" STRING,
    "pain_point04" STRING,
    "unique01" STRING,
    "unique02" STRING,
    "unique03" STRING,
    "unique04" STRING,
    "tool01" STRING,
    "tool02" STRING,
    "tool03" STRING,
    "tool04" STRING,
    "website" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "EmailContact" (
    "id" STRING NOT NULL,
    "email" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "Event" (
    "id" STRING NOT NULL,
    "type" STRING NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" STRING NOT NULL,
    "fullName" STRING NOT NULL,
    "website" STRING NOT NULL,
    "email" STRING NOT NULL,
    "description" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "mimeType" STRING NOT NULL,
    "data" BYTES NOT NULL,
    "title" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "ImageOnPost" (
    "id" STRING NOT NULL,
    "postId" STRING NOT NULL,
    "imageId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "mimeType" STRING NOT NULL,
    "data" BYTES NOT NULL,
    "title" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "AvatarOnPost" (
    "id" STRING NOT NULL,
    "postId" STRING NOT NULL,
    "avatarId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" STRING NOT NULL,
    "title" STRING,
    "slug" STRING NOT NULL,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "title" STRING,
    "content" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postSlug" STRING,
    "aiResponse" STRING,
    "postId" STRING,
    "userEmail" STRING,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "AiResponse" (
    "id" STRING NOT NULL,
    "title" STRING,
    "comment" STRING,
    "commentBy" STRING,
    "response" STRING,
    "commentingSystemId" STRING,
    "articleCommentId" STRING,
    "postId" STRING
);

-- CreateTable
CREATE TABLE "Sponsors" (
    "id" STRING NOT NULL,
    "title" STRING,
    "postId" STRING,
    "submissionId" STRING,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "EmailTool" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "subjectLine" STRING,
    "emailBody" STRING,
    "productImage" STRING,
    "productDescritption" STRING,
    "productUrl" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "title" STRING,
    "subjectLine" STRING,
    "emailBody" STRING,
    "productImage" STRING,
    "productDescritption" STRING,
    "productUrl" STRING,
    "category" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "id" STRING NOT NULL,
    "url" STRING,
    "type" STRING,
    "email" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "ContactList" (
    "id" STRING NOT NULL,
    "url" STRING,
    "type" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "Connectors" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "subjectLine" STRING,
    "emailBody" STRING,
    "productImage" STRING,
    "productDescritption" STRING,
    "productUrl" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "Files" (
    "id" STRING NOT NULL,
    "emailToolId" STRING,
    "campaignId" STRING,
    "connectorsId" STRING,
    "filename" STRING,
    "knowledgeBaseId" STRING,
    "contactListId" STRING,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "TrialProspect" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "Email" STRING,
    "image" STRING
);

-- CreateTable
CREATE TABLE "EmailList" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "userId" STRING,
    "teamId" STRING
);

-- CreateTable
CREATE TABLE "TrialProspectTwo" (
    "id" STRING NOT NULL,
    "emai" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "Email" STRING,
    "image" STRING
);

-- CreateTable
CREATE TABLE "ForgedAI" (
    "id" STRING NOT NULL,
    "product" STRING,
    "useCaseTwo" STRING NOT NULL,
    "useCase" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" STRING NOT NULL,
    "brandName" STRING NOT NULL,
    "email" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Blogger" (
    "id" STRING NOT NULL,
    "BloggerId" STRING,
    "email" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Social" (
    "id" STRING NOT NULL,
    "facebook" STRING,
    "twitch" STRING,
    "tiktok" STRING,
    "google" STRING,
    "twitter" STRING,
    "BloggerId" STRING,
    "userId" STRING
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" STRING NOT NULL,
    "title" STRING,
    "content" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postSlug" STRING,
    "aiResponse" STRING,
    "postId" STRING,
    "userEmail" STRING,
    "userId" STRING,
    "aiResponseId" STRING
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "company" STRING NOT NULL,
    "email" STRING NOT NULL,
    "reason" STRING NOT NULL,
    "message" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "MaaP" (
    "id" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Trends_files" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "url" STRING,
    "iaId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Marketing_Plan_files" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "url" STRING,
    "planId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Marketing_Creatives_files" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "url" STRING,
    "creativesId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_id_key" ON "VerificationToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_key" ON "VerificationToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_token_key" ON "VerificationToken"("userId", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RecentUpdates_id_key" ON "RecentUpdates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignHistory_id_key" ON "CampaignHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_key" ON "Update"("id");

-- CreateIndex
CREATE UNIQUE INDEX "History_id_key" ON "History"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLaunchData_id_key" ON "ProductLaunchData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailContact_id_key" ON "EmailContact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_id_key" ON "Submission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageOnPost_id_key" ON "ImageOnPost"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_id_key" ON "Avatar"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AvatarOnPost_id_key" ON "AvatarOnPost"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_id_key" ON "AiResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_articleCommentId_key" ON "AiResponse"("articleCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsors_id_key" ON "Sponsors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTool_id_key" ON "EmailTool"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_id_key" ON "Campaign"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeBase_id_key" ON "KnowledgeBase"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContactList_id_key" ON "ContactList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Connectors_id_key" ON "Connectors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Files_id_key" ON "Files"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TrialProspect_id_key" ON "TrialProspect"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailList_id_key" ON "EmailList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TrialProspectTwo_id_key" ON "TrialProspectTwo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ForgedAI_id_key" ON "ForgedAI"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blogger_id_key" ON "Blogger"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Social_id_key" ON "Social"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

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

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "AvatarOnPost" ADD CONSTRAINT "AvatarOnPost_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_BloggerId_fkey" FOREIGN KEY ("BloggerId") REFERENCES "Blogger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_aiResponseId_fkey" FOREIGN KEY ("aiResponseId") REFERENCES "AiResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trends_files" ADD CONSTRAINT "Trends_files_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_files" ADD CONSTRAINT "Marketing_Plan_files_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_files" ADD CONSTRAINT "Marketing_Creatives_files_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
