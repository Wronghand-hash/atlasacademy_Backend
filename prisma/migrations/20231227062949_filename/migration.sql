/*
  Warnings:

  - Added the required column `filename` to the `AudioBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AudioBooks" ADD COLUMN     "filename" TEXT NOT NULL;
