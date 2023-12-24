-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "UserType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" DROP NOT NULL;
