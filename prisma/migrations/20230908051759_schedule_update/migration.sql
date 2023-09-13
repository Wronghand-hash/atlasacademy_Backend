/*
  Warnings:

  - You are about to drop the column `days` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `image_buffer` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_name` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "days",
DROP COLUMN "level",
DROP COLUMN "teacher",
DROP COLUMN "time",
ADD COLUMN     "image_buffer" TEXT NOT NULL,
ADD COLUMN     "image_name" TEXT NOT NULL;
