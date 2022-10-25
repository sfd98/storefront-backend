// @ts-ignore
import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: String;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders due to ${err}!`);
        }
    }
    async show(id: string): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get order ${id} due to ${err}!`);
        }
    }
}