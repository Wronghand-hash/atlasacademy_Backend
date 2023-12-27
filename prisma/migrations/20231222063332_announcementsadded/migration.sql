-- CreateTable
CREATE TABLE "Announcements" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);
