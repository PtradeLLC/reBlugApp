/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `emailList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emailList_teamId_key" ON "emailList"("teamId");
