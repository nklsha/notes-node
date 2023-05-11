-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "note" (
    "title" VARCHAR,
    "description" VARCHAR,
    "date_updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "date_created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),

    CONSTRAINT "note_pk" PRIMARY KEY ("id")
);
