import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from './src/lib/prisma.ts';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  
  // Get all pizzas
  app.get('/api/pizzas', async (req, res) => {
    try {
      const pizzas = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(pizzas);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pizzas' });
    }
  });

  // Create order
  app.post('/api/orders', async (req, res) => {
    const { customerName, phone, address, notes, items, totalAmount } = req.body;
    try {
      const order = await prisma.order.create({
        data: {
          customerName,
          phone,
          address,
          notes,
          totalAmount,
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: { items: true }
      });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  // Admin: Get all orders
  app.get('/api/admin/orders', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // Admin: Update order status
  app.patch('/api/admin/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const order = await prisma.order.update({
        where: { id },
        data: { status }
      });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  });

  // Admin: Menu CRUD
  app.post('/api/admin/pizzas', async (req, res) => {
    const { name, description, price, image, category } = req.body;
    try {
      const pizza = await prisma.product.create({
        data: { name, description, price, image, category }
      });
      res.json(pizza);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add pizza' });
    }
  });

  app.put('/api/admin/pizzas/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;
    try {
      const pizza = await prisma.product.update({
        where: { id },
        data: { name, description, price, image, category }
      });
      res.json(pizza);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update pizza' });
    }
  });

  app.delete('/api/admin/pizzas/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.product.delete({ where: { id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete pizza' });
    }
  });

  // Simple Admin Login
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@depizzatown.com' && password === 'admin123') {
      res.json({ token: 'mock-jwt-token', user: { email } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Settings: Get
  app.get('/api/settings', async (req, res) => {
    try {
      const settings = await prisma.settings.findUnique({
        where: { id: 'site-settings' }
      });
      if (!settings) {
        return res.status(404).json({ error: 'Settings not found' });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  // Settings: Get/Update (Admin)
  app.get('/api/admin/settings', async (req, res) => {
    try {
      const settings = await prisma.settings.findUnique({
        where: { id: 'site-settings' }
      });
      if (!settings) {
        return res.status(404).json({ error: 'Settings not found' });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  app.put('/api/admin/settings', async (req, res) => {
    try {
      const data = req.body;
      const settings = await prisma.settings.upsert({
        where: { id: 'site-settings' },
        update: data,
        create: { id: 'site-settings', ...data }
      });
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  });

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API Server running at http://localhost:${PORT}`);
  });
}

startServer();
