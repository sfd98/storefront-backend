// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: String;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders due to ${err}!`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get order ${id} due to ${err}!`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Cannot create order for user ${o.user_id} due to ${err}!`
      );
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;";
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}!`
      );
    }
  }

  async ordersByUser(
    user_id: string
  ): Promise<{ userId: number; order_id: string }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT id FROM oders WHERE user_id = {$1}";
      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
