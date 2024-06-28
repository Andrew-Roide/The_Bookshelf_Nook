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
    const { username, password } = req.body as Partial<Auth>;
    console.log('Username:', username, 'Password:', password);
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashPassword = await argon2.hash(password);

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

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
    select "userId", "hashedPassword"
      from "users"
      where "username" = $1;
    `;
    const params = [username];
    const result = await db.query(sql, params);
    if (result.rows.length === 0) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = result.rows[0];
    const passwordMatch = await argon2.verify(hashedPassword, password); // compares the provided plaintext password with the hashed password (hashedPassword) stored in the database. It does so by hashing the provided password and comparing the resulting hash with the stored hash.
    if (!passwordMatch) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.status(200).json({ payload, token });

    /* In a scenario where two users have the same password and you've verified the password successfully, you would typically use additional user information, such as userId and username, to distinguish between the users.
      Once you've verified the password, you can create a JSON Web Token (JWT) containing information about the authenticated user, such as their userId and username, and then use this token for subsequent authenticated requests.
      ***JWT token can be stored in various places like HTTP Headers and Cookies***
    */
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
