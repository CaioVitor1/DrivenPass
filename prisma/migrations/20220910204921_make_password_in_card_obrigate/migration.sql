/*
  Warnings:

  - Made the column `password` on table `cards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "password" SET NOT NULL;
