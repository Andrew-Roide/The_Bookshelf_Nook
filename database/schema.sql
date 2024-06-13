set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userid" serial PRIMARY KEY,
  "userName" text,
  "hashedPassword" text,
  "created_at" timestamp
);

CREATE TABLE "savedBooks" (
  "bookid" serial PRIMARY KEY,
  "bookImg" text,
  "bookTitle" text,
  "bookAuthor" text,
  "numOfPages" integer,
  "ISBN" integer
);

ALTER TABLE "savedBooks" ADD FOREIGN KEY ("bookid") REFERENCES "users" ("userid");
