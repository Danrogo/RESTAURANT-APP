import sql from 'mssql';
import initDatabaseConnection, { getDbPool } from '../db/config.js';

// ✅ Ensure the DB is initialized once before use
await initDatabaseConnection();

export const getAllRestaurants = async () => {
  const pool = getDbPool();
  const result = await pool.request().query('SELECT * FROM Restaurants');
  return result.recordset;
};

export const getRestaurantByIdService = async (id: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Restaurants WHERE restaurant_id = @id');
  return result.recordset[0];
};

export const createRestaurantService = async (restaurantData: any) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('name', sql.NVarChar(100), restaurantData.name)
    .input('description', sql.NVarChar(500), restaurantData.description)
    .input('address', sql.NVarChar(200), restaurantData.address)
    .input('city', sql.NVarChar(50), restaurantData.city)
    .input('phone_number', sql.NVarChar(15), restaurantData.phone_number)
    .input('email', sql.NVarChar(100), restaurantData.email)
    .input('opening_time', sql.Time, restaurantData.opening_time)
    .input('closing_time', sql.Time, restaurantData.closing_time)
    .input('cuisine_type', sql.NVarChar(50), restaurantData.cuisine_type)
    .query(`
      INSERT INTO Restaurants (name, description, address, city, phone_number, email, opening_time, closing_time, cuisine_type)
      OUTPUT INSERTED.*
      VALUES (@name, @description, @address, @city, @phone_number, @email, @opening_time, @closing_time, @cuisine_type)
    `);
  return result.recordset[0];
};

export const updateRestaurantService = async (id: number, restaurantData: any) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar(100), restaurantData.name)
    .input('description', sql.NVarChar(500), restaurantData.description)
    .input('address', sql.NVarChar(200), restaurantData.address)
    .input('city', sql.NVarChar(50), restaurantData.city)
    .input('phone_number', sql.NVarChar(15), restaurantData.phone_number)
    .input('email', sql.NVarChar(100), restaurantData.email)
    .input('opening_time', sql.Time, restaurantData.opening_time)
    .input('closing_time', sql.Time, restaurantData.closing_time)
    .input('cuisine_type', sql.NVarChar(50), restaurantData.cuisine_type)
    .input('is_active', sql.Bit, restaurantData.is_active)
    .query(`
      UPDATE Restaurants 
      SET name = @name, description = @description, address = @address, city = @city,
          phone_number = @phone_number, email = @email, opening_time = @opening_time,
          closing_time = @closing_time, cuisine_type = @cuisine_type, is_active = @is_active
      OUTPUT INSERTED.*
      WHERE restaurant_id = @id
    `);
  return result.recordset[0];
};

export const deleteRestaurantService = async (id: number) => {
  const pool = getDbPool();
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Restaurants WHERE restaurant_id = @id');
  return result.rowsAffected[0] > 0;
};
