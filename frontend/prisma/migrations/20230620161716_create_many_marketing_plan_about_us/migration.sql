-- CreateTable
CREATE TABLE "ForgedAI" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ForgedAI_id_key" ON "ForgedAI"("id");

-- AddForeignKey
ALTER TABLE "Trends_Document" ADD CONSTRAINT "Trends_Document_iaId_fkey" FOREIGN KEY ("iaId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Plan_Document" ADD CONSTRAINT "Marketing_Plan_Document_planId_fkey" FOREIGN KEY ("planId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marketing_Creatives_Document" ADD CONSTRAINT "Marketing_Creatives_Document_creativesId_fkey" FOREIGN KEY ("creativesId") REFERENCES "ForgedAI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
