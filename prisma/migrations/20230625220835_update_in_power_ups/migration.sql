/*
  Warnings:

  - Added the required column `type` to the `UserPower` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "type" AS ENUM ('continuo', 'compravel');

-- AlterTable
ALTER TABLE "UserPower" ADD COLUMN     "type" "type" NOT NULL;
