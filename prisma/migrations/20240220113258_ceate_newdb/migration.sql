/*
  Warnings:

  - You are about to drop the column `body` on the `Tweets` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Tweets` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Tweets` table. All the data in the column will be lost.
  - You are about to drop the column `repost` on the `Tweets` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Tweets` table. All the data in the column will be lost.
  - You are about to drop the column `profil` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailProfil` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweets" DROP COLUMN "body",
DROP COLUMN "image",
DROP COLUMN "like",
DROP COLUMN "repost",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "profil",
DROP COLUMN "thumbnailProfil",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "profil_url" TEXT;

-- DropEnum
DROP TYPE "Etat";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idPost" INTEGER NOT NULL,
    "count_like" TEXT,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retweet" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idPost" INTEGER NOT NULL,
    "count_retweet" TEXT,

    CONSTRAINT "Retweet_pkey" PRIMARY KEY ("id")
);
