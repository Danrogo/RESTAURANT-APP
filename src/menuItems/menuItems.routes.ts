import { Hono } from 'hono';
import { 
  getMenuItems, 
  getMenuItemById, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  getMenuItemsByRestaurant,
  getMenuItemsByCategory
} from './menuItems.controllers.js';

const menuItemRoutes = new Hono();

menuItemRoutes.get('/menu-items', getMenuItems);
menuItemRoutes.get('/menu-items/:id', getMenuItemById);
menuItemRoutes.get('/restaurants/:restaurantId/menu-items', getMenuItemsByRestaurant);
menuItemRoutes.get('/categories/:categoryId/menu-items', getMenuItemsByCategory);
menuItemRoutes.post('/menu-items', createMenuItem);
menuItemRoutes.put('/menu-items/:id', updateMenuItem);
menuItemRoutes.delete('/menu-items/:id', deleteMenuItem);

export default menuItemRoutes;