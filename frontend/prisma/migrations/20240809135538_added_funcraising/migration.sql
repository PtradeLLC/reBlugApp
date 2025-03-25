-- CreateTable
CREATE TABLE "FundraisingCampaign" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "website" TEXT,
    "selectedItem" TEXT,
    "about" TEXT,
    "objectives" TEXT,
    "demographicId" TEXT NOT NULL,
    "strategy" TEXT[],
    "proHire" TEXT,
    "timeline" TEXT,
    "momentum" TEXT,
    "employment" TEXT,
    "engagementEval" TEXT,
    "postCampaign" TEXT,
    "wealthIndicator" TEXT,
    "fundingGoals" TEXT,
    "donorRetention" TEXT,
    "recurringGiving" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundraisingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demographic" (
    "id" TEXT NOT NULL,
    "campaignReason" TEXT,
    "geographicId" TEXT NOT NULL,
    "targetDonor" TEXT,
    "gender" TEXT,
    "age" TEXT,
    "intention" TEXT,

    CONSTRAINT "Demographic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geographic" (
    "id" TEXT NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,

    CONSTRAINT "Geographic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FundraisingCampaign_demographicId_key" ON "FundraisingCampaign"("demographicId");

-- CreateIndex
CREATE UNIQUE INDEX "Demographic_geographicId_key" ON "Demographic"("geographicId");

-- AddForeignKey
ALTER TABLE "FundraisingCampaign" ADD CONSTRAINT "FundraisingCampaign_demographicId_fkey" FOREIGN KEY ("demographicId") REFERENCES "Demographic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demographic" ADD CONSTRAINT "Demographic_geographicId_fkey" FOREIGN KEY ("geographicId") REFERENCES "Geographic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
