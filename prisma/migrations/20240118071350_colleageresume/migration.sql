/*
  Warnings:

  - A unique constraint covering the columns `[colleage_id]` on the table `colleagesResume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "colleagesResume_colleage_id_key" ON "colleagesResume"("colleage_id");
