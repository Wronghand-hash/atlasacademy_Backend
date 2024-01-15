/*
  Warnings:

  - Added the required column `line_number` to the `registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "line_number" TEXT NOT NULL;
