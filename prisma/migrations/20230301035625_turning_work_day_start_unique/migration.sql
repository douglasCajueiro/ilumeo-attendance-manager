/*
  Warnings:

  - A unique constraint covering the columns `[work_day_start]` on the table `work_days` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "work_days_work_day_start_key" ON "work_days"("work_day_start");
