/*
  Warnings:

  - You are about to drop the column `body` on the `Articles` table. All the data in the column will be lost.
  - Added the required column `first_body` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_header` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "body",
ADD COLUMN     "first_body" TEXT NOT NULL,
ADD COLUMN     "first_header" TEXT NOT NULL,
ADD COLUMN     "second_body" TEXT,
ADD COLUMN     "second_header" TEXT,
ADD COLUMN     "third_body" TEXT,
ADD COLUMN     "third_header" TEXT;
