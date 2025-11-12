import { type Context } from 'hono';
import { 
  getAllMenuItems, 
  getMenuItemByIdService, 
  createMenuItemService, 
  updateMenuItemService, 
  deleteMenuItemService,
  getMenuItemsByRestaurantService,
  getMenuItemsByCategoryService
} from './menuItems.services.js';

export const getMenuItems = async (c: Context) => {
  try {
    const menuItems = await getAllMenuItems();
    return c.json({ success: true, data: menuItems }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getMenuItemById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const menuItem = await getMenuItemByIdService(id);
    
    if (!menuItem) {
      return c.json({ success: false, message: 'Menu item not found' }, 404);
    }
    
    return c.json({ success: true, data: menuItem }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getMenuItemsByRestaurant = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const menuItems = await getMenuItemsByRestaurantService(restaurantId);
    return c.json({ success: true, data: menuItems }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getMenuItemsByCategory = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('categoryId'));
    const menuItems = await getMenuItemsByCategoryService(categoryId);
    return c.json({ success: true, data: menuItems }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const createMenuItem = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newMenuItem = await createMenuItemService(body);
    return c.json({ success: true, data: newMenuItem }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const updatedMenuItem = await updateMenuItemService(id, body);
    
    if (!updatedMenuItem) {
      return c.json({ success: false, message: 'Menu item not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedMenuItem }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const deleteMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const result = await deleteMenuItemService(id);
    
    if (!result) {
      return c.json({ success: false, message: 'Menu item not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Menu item deleted successfully' }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};