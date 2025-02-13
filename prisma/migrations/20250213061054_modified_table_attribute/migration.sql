/*
  Warnings:

  - You are about to drop the column `clickCount` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClickAnalytics" ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "clickCount";
