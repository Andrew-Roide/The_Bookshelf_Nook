set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

-- CREATE TABLE "users" (
--   "userId" serial PRIMARY KEY,
--   "userName" text,
--   "hashedPassword" text,
--   "created_at" timestamp
-- );

CREATE TABLE "savedBooks" (
  "bookId" serial PRIMARY KEY,
  "googleBookId" text,
  "bookImage" text,
  "bookTitle" text,
  "bookAuthor" text,
  "numOfPages" integer,
  "ISBN" text
);

ALTER TABLE "savedBooks"
-- ADD CONSTRAINT "fk_savedBooks_users"
-- FOREIGN KEY ("bookId")
-- REFERENCES "users" ("userId");
