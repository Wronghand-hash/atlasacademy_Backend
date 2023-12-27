/*
  Warnings:

  - You are about to drop the column `image` on the `Books` table. All the data in the column will be lost.
  - Added the required column `file` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "image",
ADD COLUMN     "file" BYTEA NOT NULL;

-- CreateTable
CREATE TABLE "BooksImages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "filename" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "BooksImages_pkey" PRIMARY KEY ("id")
);
