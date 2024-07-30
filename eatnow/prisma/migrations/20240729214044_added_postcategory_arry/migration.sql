-- Drop foreign key constraints
ALTER TABLE "ImageOnPost" DROP CONSTRAINT "ImageOnPost_postId_fkey";
ALTER TABLE "AvatarOnPost" DROP CONSTRAINT "AvatarOnPost_postId_fkey";
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";
ALTER TABLE "AiResponse" DROP CONSTRAINT "AiResponse_postId_fkey";
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_postId_fkey";
ALTER TABLE "Sponsor" DROP CONSTRAINT "Sponsor_postId_fkey";
ALTER TABLE "Message" DROP CONSTRAINT "Message_postId_fkey";
ALTER TABLE "Niche" DROP CONSTRAINT "Niche_postId_fkey";
ALTER TABLE "Draft" DROP CONSTRAINT "Draft_postId_fkey";

-- DropIndex
DROP INDEX "Post_id_key";

-- AlterTable
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Recreate foreign key constraints
ALTER TABLE "ImageOnPost" ADD CONSTRAINT "ImageOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "AvatarOnPost" ADD CONSTRAINT "AvatarOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "AiResponse" ADD CONSTRAINT "AiResponse_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Message" ADD CONSTRAINT "Message_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Niche" ADD CONSTRAINT "Niche_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id");
