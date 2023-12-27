/*
  Warnings:

  - You are about to drop the column `BooksImages` on the `BooksImages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BooksImages" DROP COLUMN "BooksImages";

-- AddForeignKey
ALTER TABLE "BooksImages" ADD CONSTRAINT "BooksImages_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
