/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Draft` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Draft_userId_key" ON "Draft"("userId");
