-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);
