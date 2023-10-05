/*
  Warnings:

  - You are about to drop the column `buffer` on the `Videos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "buffer",
ADD COLUMN     "image_buffer" TEXT;
