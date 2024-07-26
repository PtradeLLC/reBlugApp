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
