//@ts-ignore
import Client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async OrdersByUser(): Promise<{userId: number, order_id: string}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT user.id, order.id FROM orders INNER JOIN users ON orders.user_id = user.id;'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
}