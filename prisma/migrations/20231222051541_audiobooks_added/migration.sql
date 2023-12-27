-- AlterTable
ALTER TABLE "BooksImages" ADD COLUMN     "audioBooksId" INTEGER;

-- CreateTable
CREATE TABLE "AudioBooks" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "authur" TEXT NOT NULL,
    "price" TEXT,
    "description" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "AudioBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioBooksImages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "filename" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "audioBook_id" INTEGER NOT NULL,

    CONSTRAINT "AudioBooksImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AudioBooksImages" ADD CONSTRAINT "AudioBooksImages_audioBook_id_fkey" FOREIGN KEY ("audioBook_id") REFERENCES "AudioBooks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
