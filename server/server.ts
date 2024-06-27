/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware } from './lib/index.js';
import { BookInfo } from '../shared/BookInfo.js';
import { User } from '../shared/User.js';
import { Auth } from '../shared/Auth.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, hashedPassword } = req.body as Partial<Auth>;
    if (!username || !hashedPassword) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashPassword = await argon2.hash(hashedPassword);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.get('/api/savedBooks/', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "savedBooks"
        order by "savedBooks"."bookId" desc;
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/savedBooks', async (req, res, next) => {
  try {
    const { googleBookId, bookImage, bookTitle, bookAuthor, numOfPages, ISBN } =
      req.body as Partial<BookInfo>;

    const sql = `
      insert into "savedBooks" ( "googleBookId", "bookImage", "bookTitle", "bookAuthor", "numOfPages", "ISBN")
      values ($1, $2, $3, $4, $5, $6)
      returning *;
    `;
    const params = [
      googleBookId,
      bookImage,
      bookTitle,
      bookAuthor,
      numOfPages,
      ISBN,
    ];
    const result = await db.query<BookInfo>(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/savedBooks/:bookId', async (req, res, next) => {
  try {
    const bookid = Number(req.params.bookId);
    console.log(bookid);
    if (!Number.isInteger(bookid)) {
      throw new ClientError(400, 'bookId must be an integer');
    }

    const sql = `
        delete from "savedBooks"
          where "bookId" = $1
          returning *;
      `;
    const params = [bookid];
    const deleteBookId = await db.query(sql, params);
    res.json(deleteBookId.rows[0]);
  } catch (error) {
    next(error);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
