-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SelectedKeys" ALTER COLUMN "anchorKey" DROP NOT NULL,
ALTER COLUMN "currentKey" DROP NOT NULL;
