-- CreateTable
CREATE TABLE "PublishedChannels" (
    "id" TEXT NOT NULL,
    "postId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PublishedChannels_id_key" ON "PublishedChannels"("id");

-- AddForeignKey
ALTER TABLE "PublishedChannels" ADD CONSTRAINT "PublishedChannels_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
