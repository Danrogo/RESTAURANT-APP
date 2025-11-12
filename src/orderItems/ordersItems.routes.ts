import { Hono } from 'hono';
import { 
  getOrderItems, 
  getOrderItemById, 
  createOrderItem, 
  updateOrderItem, 
  deleteOrderItem,
  getOrderItemsByOrder
} from '../orderItems/ordersItems.controllers.js';

const orderItemRoutes = new Hono();

orderItemRoutes.get('/order-items', getOrderItems);
orderItemRoutes.get('/order-items/:id', getOrderItemById);
orderItemRoutes.get('/orders/:orderId/items', getOrderItemsByOrder);
orderItemRoutes.post('/order-items', createOrderItem);
orderItemRoutes.put('/order-items/:id', updateOrderItem);
orderItemRoutes.delete('/order-items/:id', deleteOrderItem);

export default orderItemRoutes;