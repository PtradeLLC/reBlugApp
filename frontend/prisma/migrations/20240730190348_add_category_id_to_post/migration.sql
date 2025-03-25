-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'MEMBER', 'ADMIN', 'BLOGGER', 'RESTAURANT', 'SOCIAL_MEDIA_PARTNER', 'BRAND_MARKETER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "api_domain" TEXT,
    "UserType" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "name" TEXT,
    "externalId" TEXT,
    "brandName" TEXT,
    "firstName" TEXT,
    "profileImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "brandLogo" TEXT,
    "password" TEXT,
    "image" TEXT,
    "lastName" TEXT,
    "isVerified" BOOLEAN DEFAULT false,
    "provider" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MANAGER',
    "emailVerified" TIMESTAMP(3),
    "userType" TEXT,
    "referralCode" TEXT
);

-- CreateTable
CREATE TABLE "Niche" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "Niche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShadow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nicheId" TEXT NOT NULL,

    CONSTRAINT "UserShadow_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "featureImage" TEXT,
    "contentImage" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "crossPromote" BOOLEAN NOT NULL DEFAULT false,
    "podcastSingleCast" BOOLEAN NOT NULL DEFAULT false,
    "podcastMultiCast" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "selectedValue" TEXT,
    "paramsId" TEXT,
    "image" TEXT,
    "selectedFeatures" TEXT[],
    "publishedChannels" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT,
    "email" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "author" TEXT,
    "categorySlug" TEXT,
    "blogger" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "commentingSys" TEXT,
    "userId" TEXT,
    "postNiche" TEXT,
    "postSlug" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "slug" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCategory" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "postId" TEXT,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacebookMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "reach" INTEGER NOT NULL,
    "impressions" INTEGER NOT NULL,

    CONSTRAINT "FacebookMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "retweets" INTEGER NOT NULL,
    "replies" INTEGER NOT NULL,
    "impressions" INTEGER NOT NULL,

    CONSTRAINT "TwitterMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediumMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "readTime" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "MediumMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReblugMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "comments" INTEGER NOT NULL,
    "engagement" INTEGER NOT NULL,

    CONSTRAINT "ReblugMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "subscribers" INTEGER NOT NULL,
    "opens" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL,

    CONSTRAINT "NewsletterMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCampaignMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "opened" INTEGER NOT NULL,
    "clicked" INTEGER NOT NULL,
    "unsubscribed" INTEGER NOT NULL,

    CONSTRAINT "EmailCampaignMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "teamId" TEXT
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT
);

-- CreateTable
CREATE TABLE "RecentUpdates" (
    "id" TEXT NOT NULL,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "CampaignHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "Update" (
    "id" TEXT NOT NULL,
    "Update" TEXT,
    "recentUpdatesId" TEXT
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "History" TEXT,
    "campaignHistoryId" TEXT,
    "recentUpdatesId" TEXT
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "isVerified" BOOLEAN,
    "password" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT,
    "userId" TEXT
);

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
    "tool04" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "EmailContact" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ImageOnPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AvatarOnPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postSlug" TEXT,
    "aiResponse" TEXT,
    "postId" TEXT,
    "userEmail" TEXT,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "AiResponse" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "commentBy" TEXT,
    "response" TEXT,
    "commentingSystemId" TEXT,
    "articleCommentId" TEXT,
    "postId" TEXT
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "product" TEXT,
    "productDesc" TEXT,
    "brandName" TEXT,
    "website" TEXT,
    "clientOnboarded" BOOLEAN DEFAULT false,
    "postId" TEXT,
    "submissionId" TEXT,
    "userId" TEXT,
    "messageId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "brandName" TEXT,
    "productName" TEXT,
    "productImage" TEXT,
    "website" TEXT,
    "productMessage" TEXT,
    "notes" TEXT,
    "postId" TEXT
);

-- CreateTable
CREATE TABLE "EmailTool" (
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
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT,
    "subjectLine" TEXT,
    "emailBody" TEXT,
    "productImage" TEXT,
    "productDescritption" TEXT,
    "productUrl" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT
);

-- CreateTable
CREATE TABLE "KnowledgeBase" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT
);

-- CreateTable
CREATE TABLE "ContactList" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT
);

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
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "emailToolId" TEXT,
    "campaignId" TEXT,
    "connectorsId" TEXT,
    "filename" TEXT,
    "knowledgeBaseId" TEXT,
    "contactListId" TEXT,
    "userId" TEXT
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
CREATE TABLE "EmailList" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "teamId" TEXT
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
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitch" TEXT,
    "tiktok" TEXT,
    "google" TEXT,
    "twitter" TEXT,
    "BloggerId" TEXT,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postSlug" TEXT,
    "aiResponse" TEXT,
    "postId" TEXT,
    "userEmail" TEXT,
    "userId" TEXT,
    "aiResponseId" TEXT,
    "messageId" TEXT
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

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dishId" INTEGER,

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
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "menuId" INTEGER,
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
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Niche_name_key" ON "Niche"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserShadow_userId_nicheId_key" ON "UserShadow"("userId", "nicheId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Draft_postId_key" ON "Draft"("postId");

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
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_id_key" ON "AiResponse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponse_articleCommentId_key" ON "AiResponse"("articleCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_id_key" ON "Sponsor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

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

-- CreateIndex
CREATE UNIQUE INDEX "Dish_slug_key" ON "Dish"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShadow" ADD CONSTRAINT "UserShadow_nicheId_fkey" FOREIGN KEY ("nicheId") REFERENCES "Niche"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "ImageOnPost" ADD CONSTRAINT "ImageOnPost_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageOnPost" ADD CONSTRAINT "ImageOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarOnPost" ADD CONSTRAINT "AvatarOnPost_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarOnPost" ADD CONSTRAINT "AvatarOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_articleCommentId_fkey" FOREIGN KEY ("articleCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTool" ADD CONSTRAINT "EmailTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeBase" ADD CONSTRAINT "KnowledgeBase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactList" ADD CONSTRAINT "ContactList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "Files" ADD CONSTRAINT "Files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailList" ADD CONSTRAINT "EmailList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_BloggerId_fkey" FOREIGN KEY ("BloggerId") REFERENCES "Blogger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_aiResponseId_fkey" FOREIGN KEY ("aiResponseId") REFERENCES "AiResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trends_files" ADD CONSTRAINT "Trends_files_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_files" ADD CONSTRAINT "Marketing_Plan_files_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_files" ADD CONSTRAINT "Marketing_Creatives_files_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDish" ADD CONSTRAINT "OrderDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
