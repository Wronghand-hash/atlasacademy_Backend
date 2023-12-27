-- CreateTable
CREATE TABLE "ImageGallery" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ImageGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "gallery_id" INTEGER NOT NULL,

    CONSTRAINT "GalleryImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GalleryImages" ADD CONSTRAINT "GalleryImages_gallery_id_fkey" FOREIGN KEY ("gallery_id") REFERENCES "ImageGallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
