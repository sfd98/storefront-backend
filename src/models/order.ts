import Client from '../database'

export type Order = {
    id: number;
    user_id: number;
    status: String;
}

export class orderStore {
    async index(): Promise<Order[]> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders due to ${err}!`)
        }
    }
}