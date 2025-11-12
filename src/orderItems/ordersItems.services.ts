import sql from 'mssql';
import { dbConfig, getDbPool } from '../db/config.js';

export const getAllOrderItems = async () => {
    const pool = getDbPool()
  const result = await pool.request().query(`
    SELECT oi.*, mi.name as menu_item_name 
    FROM OrderItems oi
    JOIN MenuItems mi ON oi.menu_item_id = mi.menu_item_id
  `);
  return result.recordset;
};

export const getOrderItemByIdService = async (id: number) => {
  const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT oi.*, mi.name as menu_item_name 
      FROM OrderItems oi
      JOIN MenuItems mi ON oi.menu_item_id = mi.menu_item_id
      WHERE oi.order_item_id = @id
    `);
  return result.recordset[0];
};

export const getOrderItemsByOrderService = async (orderId: number) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('orderId', sql.Int, orderId)
    .query(`
      SELECT oi.*, mi.name as menu_item_name, mi.description 
      FROM OrderItems oi
      JOIN MenuItems mi ON oi.menu_item_id = mi.menu_item_id
      WHERE oi.order_id = @orderId
    `);
  return result.recordset;
};

export const createOrderItemService = async (orderItemData: any) => {
    const pool = getDbPool()
  
  // Calculate total_price
  const total_price = orderItemData.unit_price * orderItemData.quantity;
  
  const result = await pool.request()
    .input('order_id', sql.Int, orderItemData.order_id)
    .input('menu_item_id', sql.Int, orderItemData.menu_item_id)
    .input('quantity', sql.Int, orderItemData.quantity)
    .input('unit_price', sql.Decimal(10, 2), orderItemData.unit_price)
    .input('total_price', sql.Decimal(10, 2), total_price)
    .query(`
      INSERT INTO OrderItems (order_id, menu_item_id, quantity, unit_price, total_price)
      OUTPUT INSERTED.*
      VALUES (@order_id, @menu_item_id, @quantity, @unit_price, @total_price)
    `);
  return result.recordset[0];
};

export const updateOrderItemService = async (id: number, orderItemData: any) => {
   const pool = getDbPool()
  
  // Calculate total_price
  const total_price = orderItemData.unit_price * orderItemData.quantity;
  
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('quantity', sql.Int, orderItemData.quantity)
    .input('unit_price', sql.Decimal(10, 2), orderItemData.unit_price)
    .input('total_price', sql.Decimal(10, 2), total_price)
    .query(`
      UPDATE OrderItems 
      SET quantity = @quantity, unit_price = @unit_price, total_price = @total_price
      OUTPUT INSERTED.*
      WHERE order_item_id = @id
    `);
  return result.recordset[0];
};

export const deleteOrderItemService = async (id: number) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM OrderItems WHERE order_item_id = @id');
  return result.rowsAffected[0] > 0;
};