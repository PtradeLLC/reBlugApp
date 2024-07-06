-- DropForeignKey
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_userId_fkey";

-- AlterTable
ALTER TABLE "Niche" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserShadow" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserShadow"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
