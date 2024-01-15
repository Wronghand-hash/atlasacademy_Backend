-- CreateTable
CREATE TABLE "colleages" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fullname" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birth_place" TEXT NOT NULL,

    CONSTRAINT "colleages_pkey" PRIMARY KEY ("id")
);
