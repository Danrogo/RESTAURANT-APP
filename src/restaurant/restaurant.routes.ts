import { Hono } from 'hono';
import { 
  getRestaurants, 
  getRestaurantById, 
  createRestaurant, 
  updateRestaurant, 
  deleteRestaurant 
} from '../restaurant/restaurant.controller.js';

const restaurantRoutes = new Hono();

restaurantRoutes.get('/restaurants', getRestaurants);
restaurantRoutes.get('/restaurants/:id', getRestaurantById);
restaurantRoutes.post('/restaurants', createRestaurant);
restaurantRoutes.put('/restaurants/:id', updateRestaurant);
restaurantRoutes.delete('/restaurants/:id', deleteRestaurant);

export default restaurantRoutes;