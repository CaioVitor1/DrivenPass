/*
  Warnings:

  - You are about to drop the column `nameUrl` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `passwordUrl` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `nameUser` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordUser` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "nameUrl",
DROP COLUMN "passwordUrl",
ADD COLUMN     "nameUser" TEXT NOT NULL,
ADD COLUMN     "passwordUser" TEXT NOT NULL;
