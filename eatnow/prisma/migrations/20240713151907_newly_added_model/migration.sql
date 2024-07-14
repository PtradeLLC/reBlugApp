-- AlterTable
ALTER TABLE "Niche" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
