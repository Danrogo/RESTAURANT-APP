import {type Context } from 'hono';
import { 
  getAllRestaurants, 
  getRestaurantByIdService, 
  createRestaurantService, 
  updateRestaurantService, 
  deleteRestaurantService 
} from '../restaurant/restaurant.services.js';

export const getRestaurants = async (c: Context) => {
  try {
    const restaurants = await getAllRestaurants();
    return c.json({ success: true, data: restaurants }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getRestaurantById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const restaurant = await getRestaurantByIdService(id);
    
    if (!restaurant) {
      return c.json({ success: false, message: 'Restaurant not found' }, 404);
    }
    
    return c.json({ success: true, data: restaurant }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const createRestaurant = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newRestaurant = await createRestaurantService(body);
    return c.json({ success: true, data: newRestaurant }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateRestaurant = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const updatedRestaurant = await updateRestaurantService(id, body);
    
    if (!updatedRestaurant) {
      return c.json({ success: false, message: 'Restaurant not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedRestaurant }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const deleteRestaurant = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const result = await deleteRestaurantService(id);
    
    if (!result) {
      return c.json({ success: false, message: 'Restaurant not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Restaurant deleted successfully' }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};