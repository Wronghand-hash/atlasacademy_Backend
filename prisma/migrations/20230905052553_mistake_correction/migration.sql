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

-- CreateTable
CREATE TABLE "ArticleImage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "buffer" TEXT NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "ArticleImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
