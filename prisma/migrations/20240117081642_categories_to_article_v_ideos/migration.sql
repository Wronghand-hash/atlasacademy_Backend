-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "colleagesResume" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "colleage_id" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "colleage_name" TEXT NOT NULL,

    CONSTRAINT "colleagesResume_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "colleagesResume" ADD CONSTRAINT "colleagesResume_colleage_id_fkey" FOREIGN KEY ("colleage_id") REFERENCES "colleages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
