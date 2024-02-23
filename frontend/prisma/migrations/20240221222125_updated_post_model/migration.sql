-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "selectedKeysId" DROP DEFAULT;
DROP SEQUENCE "Post_selectedKeysId_seq";
