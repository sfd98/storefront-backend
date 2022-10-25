import Client from '../database'

export type Product = {
    id: number;
    name: string;
    price: number;
}

export class productStore {
    async index(): Promise<Product[]> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products due to ${err}!`)
        }
    }
}