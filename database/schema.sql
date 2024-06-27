set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "hashedPassword" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "public"."savedBooks" (
  "bookId" serial PRIMARY KEY,
  "userId" integer,
  "googleBookId" text,
  "bookImage" text,
  "bookTitle" text,
  "bookAuthor" text,
  "numOfPages" integer,
  "ISBN" text
);

ALTER TABLE "public"."savedBooks"
ADD CONSTRAINT "fk_savedBooks_users"
FOREIGN KEY ("userId")
REFERENCES "public"."users" ("userId")
ON DELETE CASCADE;
