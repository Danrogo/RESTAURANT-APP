import { Hono } from 'hono';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  getCategoriesByRestaurant
} from '../categories/categories.controllers.js';

const categoryRoutes = new Hono();

categoryRoutes.get('/categories', getCategories);
categoryRoutes.get('/categories/:id', getCategoryById);
categoryRoutes.get('/restaurants/:restaurantId/categories', getCategoriesByRestaurant);
categoryRoutes.post('/categories', createCategory);
categoryRoutes.put('/categories/:id', updateCategory);
categoryRoutes.delete('/categories/:id', deleteCategory);

export default categoryRoutes;