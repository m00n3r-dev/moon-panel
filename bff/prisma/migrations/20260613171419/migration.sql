-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "domain" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'live';
