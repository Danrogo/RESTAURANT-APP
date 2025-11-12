import sql from 'mssql';
import { getDbPool } from '../db/config.js';

export const getAllCategories = async () => {
    const pool = getDbPool()
  const result = await pool.request().query('SELECT * FROM Categories');
  return result.recordset;
};

export const getCategoryByIdService = async (id: number) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Categories WHERE category_id = @id');
  return result.recordset[0];
};

export const getCategoriesByRestaurantService = async (restaurantId: number) => {
  const pool = getDbPool()
  const result = await pool.request()
    .input('restaurantId', sql.Int, restaurantId)
    .query('SELECT * FROM Categories WHERE restaurant_id = @restaurantId AND is_active = 1');
  return result.recordset;
};

export const createCategoryService = async (categoryData: any) => {
  const pool = getDbPool()
  const result = await pool.request()
    .input('restaurant_id', sql.Int, categoryData.restaurant_id)
    .input('name', sql.NVarChar(50), categoryData.name)
    .input('description', sql.NVarChar(255), categoryData.description)
    .query(`
      INSERT INTO Categories (restaurant_id, name, description)
      OUTPUT INSERTED.*
      VALUES (@restaurant_id, @name, @description)
    `);
  return result.recordset[0];
};

export const updateCategoryService = async (id: number, categoryData: any) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar(50), categoryData.name)
    .input('description', sql.NVarChar(255), categoryData.description)
    .input('is_active', sql.Bit, categoryData.is_active)
    .query(`
      UPDATE Categories 
      SET name = @name, description = @description, is_active = @is_active
      OUTPUT INSERTED.*
      WHERE category_id = @id
    `);
  return result.recordset[0];
};

export const deleteCategoryService = async (id: number) => {
    const pool = getDbPool()
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Categories WHERE category_id = @id');
  return result.rowsAffected[0] > 0;
};