-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CREATOR';

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitch" TEXT,
    "tiktok" TEXT,
    "google" TEXT,
    "twiter" TEXT,
    "creatorId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_id_key" ON "Creator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Social_id_key" ON "Social"("id");

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
