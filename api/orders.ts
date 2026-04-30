import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/db';

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
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
