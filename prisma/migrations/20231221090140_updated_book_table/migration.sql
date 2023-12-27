/*
  Warnings:

  - Added the required column `book_id` to the `BooksImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "file" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BooksImages" ADD COLUMN     "BooksImages" TEXT,
ADD COLUMN     "book_id" INTEGER NOT NULL;
