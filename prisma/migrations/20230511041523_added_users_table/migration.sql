-- AlterTable
ALTER TABLE "note" ADD COLUMN     "userId" UUID;

-- CreateTable
CREATE TABLE "user" (
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "date_updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
