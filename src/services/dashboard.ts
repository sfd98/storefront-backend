//@ts-ignore
import client from "../database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async OrdersByUser(user_id: string): Promise<{ userId: number; order_id: string }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      //const sql ="SELECT users.id, orders.id FROM orders INNER JOIN users ON users.id = orders.user_id;";
      const sql = "SELECT id FROM oders WHERE user_id = {$1}"
      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
