/*
  Warnings:

  - You are about to drop the column `type` on the `UserPower` table. All the data in the column will be lost.
  - Added the required column `type` to the `PowerUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PowerUp" ADD COLUMN     "type" "type" NOT NULL;

-- AlterTable
ALTER TABLE "UserPower" DROP COLUMN "type";
