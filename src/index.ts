import { serve } from '@hono/node-server'
import { type Context, Hono } from 'hono';
import { logger } from 'hono/logger'
import { prometheus } from '@hono/prometheus';
import { limiter } from '../src/middelware/rateLimiter.js';
import  initDatabaseConnection  from "../src/db/config.js"
import userRoutes from './users/users.routes.js';
import authRoutes from '../src/Auth/auth.routes.js';
import orderRoutes from './orders/orders.routes.js';
import orderItemRoutes from '../src/orderItems/ordersItems.routes.js';


const app = new Hono();

await initDatabaseConnection();

// Prometheus middleware
const { printMetrics, registerMetrics } = prometheus()

app.use('*', registerMetrics); // prometheus to monitor metrics
app.get('/metrics', printMetrics); // endpoint to expose metrics

// Apply logger middleware
app.use('*', logger()); // logs request and response to the console

// Apply rate limiter middleware
app.use(limiter);

// Root endpoint
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Restaurant Ordering System API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      orders: '/api/orders',
      orderItems: '/api/order-items'
    }
  });
});

// Mount API routes
app.route("/api", userRoutes);
app.route("/api", authRoutes);
app.route("/api", orderRoutes);
app.route("/api", orderItemRoutes);


// 404 handler
app.notFound((c: Context) => {
  return c.json({
    success: false,
    message: 'Route not found',
    path: c.req.path
  }, 404);
});

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});