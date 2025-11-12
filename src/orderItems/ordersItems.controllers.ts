import { type Context } from 'hono';
import { 
  getAllOrderItems, 
  getOrderItemByIdService, 
  createOrderItemService, 
  updateOrderItemService, 
  deleteOrderItemService,
  getOrderItemsByOrderService
} from '../orderItems/ordersItems.services.js';

export const getOrderItems = async (c: Context) => {
  try {
    const orderItems = await getAllOrderItems();
    return c.json({ success: true, data: orderItems }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getOrderItemById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const orderItem = await getOrderItemByIdService(id);
    
    if (!orderItem) {
      return c.json({ success: false, message: 'Order item not found' }, 404);
    }
    
    return c.json({ success: true, data: orderItem }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const getOrderItemsByOrder = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('orderId'));
    const orderItems = await getOrderItemsByOrderService(orderId);
    return c.json({ success: true, data: orderItems }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};

export const createOrderItem = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newOrderItem = await createOrderItemService(body);
    return c.json({ success: true, data: newOrderItem }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const updateOrderItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const updatedOrderItem = await updateOrderItemService(id, body);
    
    if (!updatedOrderItem) {
      return c.json({ success: false, message: 'Order item not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedOrderItem }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 400);
  }
};

export const deleteOrderItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const result = await deleteOrderItemService(id);
    
    if (!result) {
      return c.json({ success: false, message: 'Order item not found' }, 404);
    }
    
    return c.json({ success: true, message: 'Order item deleted successfully' }, 200);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
};