// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: String;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
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
      const conn = await Client.connect();
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
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(
        `Cannot create order for user ${o.user_id} due to ${err}!`
      );
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order-products (quantity, orderId, productId) VALUES ($1, $2, $3) RETURNING *;";
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
}
