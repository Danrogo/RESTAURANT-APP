import { Hono } from 'hono';
import { 
  getOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getOrdersByCustomer,
  getOrdersByRestaurant,
  updateOrderStatus
} from '../orders/orders.controllers.js';

const orderRoutes = new Hono();

orderRoutes.get('/orders', getOrders);
orderRoutes.get('/orders/:id', getOrderById);
orderRoutes.get('/customers/:customerId/orders', getOrdersByCustomer);
orderRoutes.get('/restaurants/:restaurantId/orders', getOrdersByRestaurant);
orderRoutes.post('/orders', createOrder);
orderRoutes.put('/orders/:id', updateOrder);
orderRoutes.patch('/orders/:id/status', updateOrderStatus);
orderRoutes.delete('/orders/:id', deleteOrder);

export default orderRoutes;