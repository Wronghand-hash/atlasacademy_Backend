/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Schedules" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "image_buffer" TEXT,
    "image_name" TEXT,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);
