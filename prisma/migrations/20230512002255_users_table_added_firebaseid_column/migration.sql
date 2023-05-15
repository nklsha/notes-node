/*
  Warnings:

  - A unique constraint covering the columns `[firebaseId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "firebaseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_firebaseId_key" ON "user"("firebaseId");
