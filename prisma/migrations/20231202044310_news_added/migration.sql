-- CreateTable
CREATE TABLE "News" (
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

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsImages" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,

    CONSTRAINT "NewsImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsImages" ADD CONSTRAINT "NewsImages_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
