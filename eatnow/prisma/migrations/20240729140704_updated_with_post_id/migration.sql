-- AlterTable
ALTER TABLE "Niche" ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postNiche" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isVerified" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
