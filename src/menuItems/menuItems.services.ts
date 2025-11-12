import sql from 'mssql';
import { getDbPool} from '../db/config.js';

export const getAllMenuItems = async () => {
  const pool = getDbPool()
  const result = await pool.request().query('SELECT * FROM MenuItems');
  return result.recordset;
};

export const getMenuItemByIdService = async (id: number) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM MenuItems WHERE menu_item_id = @id');
  return result.recordset[0];
};

export const getMenuItemsByRestaurantService = async (restaurantId: number) => {
  const pool = getDbPool()
  const result = await pool.request()
    .input('restaurantId', sql.Int, restaurantId)
    .query('SELECT * FROM MenuItems WHERE restaurant_id = @restaurantId AND is_available = 1');
  return result.recordset;
};

export const getMenuItemsByCategoryService = async (categoryId: number) => {
  const pool = getDbPool()
  const result = await pool.request()
    .input('categoryId', sql.Int, categoryId)
    .query('SELECT * FROM MenuItems WHERE category_id = @categoryId AND is_available = 1');
  return result.recordset;
};

export const createMenuItemService = async (menuItemData: any) => {
   const pool = getDbPool()
  const result = await pool.request()
    .input('restaurant_id', sql.Int, menuItemData.restaurant_id)
    .input('category_id', sql.Int, menuItemData.category_id)
    .input('name', sql.NVarChar(100), menuItemData.name)
    .input('description', sql.NVarChar(500), menuItemData.description)
    .input('price', sql.Decimal(10, 2), menuItemData.price)
    .query(`
      INSERT INTO MenuItems (restaurant_id, category_id, name, description, price)
      OUTPUT INSERTED.*
      VALUES (@restaurant_id, @category_id, @name, @description, @price)
    `);
  return result.recordset[0];
};

export const updateMenuItemService = async (id: number, menuItemData: any) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar(100), menuItemData.name)
    .input('description', sql.NVarChar(500), menuItemData.description)
    .input('price', sql.Decimal(10, 2), menuItemData.price)
    .input('is_available', sql.Bit, menuItemData.is_available)
    .query(`
      UPDATE MenuItems 
      SET name = @name, description = @description, price = @price, is_available = @is_available
      OUTPUT INSERTED.*
      WHERE menu_item_id = @id
    `);
  return result.recordset[0];
};

export const deleteMenuItemService = async (id: number) => {
 const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM MenuItems WHERE menu_item_id = @id');
  return result.rowsAffected[0] > 0;
};