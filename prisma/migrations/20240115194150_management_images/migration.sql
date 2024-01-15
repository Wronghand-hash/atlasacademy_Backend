-- CreateTable
CREATE TABLE "Managements" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_image" TEXT NOT NULL,
    "second_image" TEXT NOT NULL,
    "third_image" TEXT NOT NULL,

    CONSTRAINT "Managements_pkey" PRIMARY KEY ("id")
);
