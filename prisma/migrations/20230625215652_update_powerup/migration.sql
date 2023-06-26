/*
  Warnings:

  - You are about to drop the column `function` on the `PowerUp` table. All the data in the column will be lost.
  - Added the required column `power_function` to the `PowerUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PowerUp" DROP COLUMN "function",
ADD COLUMN     "power_function" VARCHAR(500) NOT NULL;
