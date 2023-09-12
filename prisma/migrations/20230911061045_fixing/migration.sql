-- CreateEnum
CREATE TYPE "roles" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" "roles" NOT NULL DEFAULT 'STUDENT',
    "CreativityTestResult" INTEGER,
    "TorrenceTestResult" INTEGER,
    "QnA" TEXT,
    "age" INTEGER,
    "status" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "authur" TEXT NOT NULL,
    "first_header" TEXT NOT NULL,
    "first_body" TEXT NOT NULL,
    "second_header" TEXT,
    "second_body" TEXT,
    "third_header" TEXT,
    "third_body" TEXT,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

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
    "image_buffer" TEXT,
    "image_name" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Exams" ADD CONSTRAINT "Exams_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleImage" ADD CONSTRAINT "ArticleImage_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
