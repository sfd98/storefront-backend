// @ts-ignore
import client from '../database'

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products due to ${err}!`)
        }
    }
}