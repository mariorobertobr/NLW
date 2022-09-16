/*
  Warnings:

  - You are about to drop the column `hourStart` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `hoursEnd` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `hourEnd` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourtart` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "hourStart",
DROP COLUMN "hoursEnd",
ADD COLUMN     "hourEnd" INTEGER NOT NULL,
ADD COLUMN     "hourtart" INTEGER NOT NULL;
