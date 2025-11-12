import sql from 'mssql';
import  { getDbPool } from '../db/config.js';


export const getAllOrders = async () => {
  const pool = getDbPool();
  const result = await pool.request().query(`
    SELECT o.*, u.first_name, u.last_name, r.name AS restaurant_name 
    FROM Orders o
    JOIN Users1 u ON o.customer_id = u.user_id
    JOIN Restaurants r ON o.restaurant_id = r.restaurant_id
  `);
  return result.recordset;
};

export const getOrderByIdService = async (id: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT o.*, u.first_name, u.last_name, r.name AS restaurant_name 
      FROM Orders o
      JOIN Users1 u ON o.customer_id = u.user_id
      JOIN Restaurants r ON o.restaurant_id = r.restaurant_id
      WHERE o.order_id = @id
    `);
  return result.recordset[0];
};

export const getOrdersByCustomerService = async (customerId: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('customerId', sql.Int, customerId)
    .query(`
      SELECT o.*, r.name AS restaurant_name 
      FROM Orders o
      JOIN Restaurants r ON o.restaurant_id = r.restaurant_id
      WHERE o.customer_id = @customerId
      ORDER BY o.created_at DESC
    `);
  return result.recordset;
};

export const getOrdersByRestaurantService = async (restaurantId: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('restaurantId', sql.Int, restaurantId)
    .query(`
      SELECT o.*, u.first_name, u.last_name 
      FROM Orders o
      JOIN Users u ON o.customer_id = u.user_id
      WHERE o.restaurant_id = @restaurantId
      ORDER BY o.created_at DESC
    `);
  return result.recordset;
};

export const createOrderService = async (orderData: any) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('restaurant_id', sql.Int, orderData.restaurant_id)
    .input('customer_id', sql.Int, orderData.customer_id)
    .input('order_type', sql.NVarChar(20), orderData.order_type)
    .input('total_amount', sql.Decimal(10, 2), orderData.total_amount)
    .query(`
      INSERT INTO Orders (restaurant_id, customer_id, order_type, total_amount)
      OUTPUT INSERTED.*
      VALUES (@restaurant_id, @customer_id, @order_type, @total_amount)
    `);
  return result.recordset[0];
};

export const updateOrderService = async (id: number, orderData: any) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('order_type', sql.NVarChar(20), orderData.order_type)
    .input('status', sql.NVarChar(20), orderData.status)
    .input('total_amount', sql.Decimal(10, 2), orderData.total_amount)
    .query(`
      UPDATE Orders 
      SET order_type = @order_type, status = @status, total_amount = @total_amount
      OUTPUT INSERTED.*
      WHERE order_id = @id
    `);
  return result.recordset[0];
};

export const updateOrderStatusService = async (id: number, status: string) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('status', sql.NVarChar(20), status)
    .query(`
      UPDATE Orders 
      SET status = @status
      OUTPUT INSERTED.*
      WHERE order_id = @id
    `);
  return result.recordset[0];
};

export const deleteOrderService = async (id: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Orders WHERE order_id = @id');
  return result.rowsAffected[0] > 0;
};
