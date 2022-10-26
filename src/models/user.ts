// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Client } from "pg";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = String(process.env.SALT_ROUNDS);
export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users due to ${err}!`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user ${id} due to ${err}!`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password_digest) VALUES ($1, $2, $3) RETURNING *;";

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));

      const result = await conn.query(sql, u.firstName, u.lastName, u.password);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Cannot create user ${u.firstName} ${u.lastName} due to ${err}!`
      );
    }
  }

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    //@ts-ignore
    const conn = await Client.connect();
    const sql =
      "SELECT password_digest FROM users WHERE firstName=($1) AND lastName=($2);";

    const result = await conn.query(sql, [firstName, lastName]);

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
