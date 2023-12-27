/*
  Warnings:

  - You are about to drop the column `image` on the `GalleryImages` table. All the data in the column will be lost.
  - Added the required column `file` to the `GalleryImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GalleryImages" DROP COLUMN "image",
ADD COLUMN     "file" TEXT NOT NULL;
