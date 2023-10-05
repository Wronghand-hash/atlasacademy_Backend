/*
  Warnings:

  - The `buffer` column on the `Videos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "buffer",
ADD COLUMN     "buffer" BYTEA;
