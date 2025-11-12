import { type Context } from 'hono';
import { 
  getAllOrders, 
  getOrderByIdService, 
  createOrderService, 
  updateOrderService, 
  deleteOrderService,
  getOrdersByCustomerService,
  getOrdersByRestaurantService,
  updateOrderStatusService
} from '../orders/orders.services.js';

export const getOrders = async (c: Context) => {
  try {
    const orders = await getAllOrders();
    return c.json({ success: true, data: orders }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getOrderById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const order = await getOrderByIdService(id);
    
    if (!order) {
      return c.json({ success: false, message: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, data: order }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getOrdersByCustomer = async (c: Context) => {
  try {
    const customerId = parseInt(c.req.param('customerId'));
    const orders = await getOrdersByCustomerService(customerId);
    return c.json({ success: true, data: orders }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getOrdersByRestaurant = async (c: Context) => {
  try {
    const restaurantId = parseInt(c.req.param('restaurantId'));
    const orders = await getOrdersByRestaurantService(restaurantId);
    return c.json({ success: true, data: orders }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const createOrder = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newOrder = await createOrderService(body);
    return c.json({ success: true, data: newOrder }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateOrder = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const updatedOrder = await updateOrderService(id, body);
    
    if (!updatedOrder) {
      return c.json({ success: false, message: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedOrder }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateOrderStatus = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const { status } = await c.req.json();
    const updatedOrder = await updateOrderStatusService(id, status);
    
    if (!updatedOrder) {
      return c.json({ success: false, message: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedOrder }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const deleteOrder = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const result = await deleteOrderService(id);
    
    if (!result) {
      return c.json({ success: false, message: 'Order not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Order deleted successfully' }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};