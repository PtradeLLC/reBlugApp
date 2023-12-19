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

-- CreateIndex
CREATE UNIQUE INDEX "RecentUpdates_id_key" ON "RecentUpdates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignHistory_id_key" ON "CampaignHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_key" ON "Update"("id");

-- CreateIndex
CREATE UNIQUE INDEX "History_id_key" ON "History"("id");

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
