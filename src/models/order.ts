// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type ProductInOrder = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
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
      console.log(order);
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Cannot create order for user ${o.user_id} due to ${err}!`
      );
    }
  }

  async addProduct(po: ProductInOrder): Promise<ProductInOrder> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;";
      const result = await conn.query(sql, [
        po.quantity,
        po.order_id,
        po.product_id,
      ]);
      const order = result.rows[0];
      console.log(order);
      conn.release();
      return order;
    } catch {
      throw new Error(
        `Could not add product ${po.product_id} to order ${po.order_id}!`
      );
    }
  }

  async ordersByUser(user_id: string): Promise<Order | Order[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1);";
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
