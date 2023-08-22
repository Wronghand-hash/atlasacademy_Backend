/*
  Warnings:

  - You are about to drop the column `IQTestResult` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "IQTestResult",
ADD COLUMN     "TorrenceTestResult" INTEGER;
