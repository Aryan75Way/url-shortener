/*
  Warnings:

  - You are about to drop the column `clickCount` on the `ClickAnalytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClickAnalytics" DROP COLUMN "clickCount";

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "clickCount" INTEGER NOT NULL DEFAULT 0;
