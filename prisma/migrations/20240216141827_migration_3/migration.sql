/*
  Warnings:

  - Added the required column `image` to the `Tweets` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tweets" ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "profil" DROP NOT NULL,
ALTER COLUMN "thumbnailProfil" DROP NOT NULL;
