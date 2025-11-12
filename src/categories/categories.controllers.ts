import { type Context } from 'hono';
import { 
  getAllCategories, 
  getCategoryByIdService, 
  createCategoryService, 
  updateCategoryService, 
  deleteCategoryService,
  getCategoriesByRestaurantService
} from '../categories/categories.services.js';

export const getCategories = async (c: Context) => {
  try {
    const categories = await getAllCategories();
    return c.json({ success: true, data: categories }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getCategoryById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const category = await getCategoryByIdService(id);
    
    if (!category) {
      return c.json({ success: false, message: 'Category not found' }, 404);
    }
    
    return c.json({ success: true, data: category }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getCategoriesByRestaurant = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const categories = await getCategoriesByRestaurantService(restaurantId);
    return c.json({ success: true, data: categories }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const createCategory = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newCategory = await createCategoryService(body);
    return c.json({ success: true, data: newCategory }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateCategory = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const updatedCategory = await updateCategoryService(id, body);
    
    if (!updatedCategory) {
      return c.json({ success: false, message: 'Category not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedCategory }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const deleteCategory = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const result = await deleteCategoryService(id);
    
    if (!result) {
      return c.json({ success: false, message: 'Category not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Category deleted successfully' }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};