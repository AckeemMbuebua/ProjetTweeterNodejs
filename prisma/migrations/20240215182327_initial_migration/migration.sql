-- CreateEnum
CREATE TYPE "Etat" AS ENUM ('null', 'true', 'false');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "profil" TEXT NOT NULL,
    "thumbnailProfil" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "joined" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tweets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "like" "Etat" NOT NULL DEFAULT 'null',
    "repost" "Etat" NOT NULL DEFAULT 'null',
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Tweets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
