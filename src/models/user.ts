// @ts-ignore
import client from '../database'

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users due to ${err}!`)
        }
    }

    async show(id: string): Promise<User> {
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1);';
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
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, u.firstName, u.lastName, u.password);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Cannot create user ${u.firstName} ${u.lastName} due to ${err}!`);
        }
    }
}