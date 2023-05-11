/*
  Warnings:

  - Made the column `userId` on table `note` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_userId_fkey";

-- AlterTable
ALTER TABLE "note" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
