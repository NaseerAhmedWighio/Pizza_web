import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"
    }
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
