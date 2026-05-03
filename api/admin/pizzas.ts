import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, description, price, image, category } = req.body;

  try {
    const pizza = await prisma.product.create({
      data: { name, description, price, image, category }
    });
    return res.status(200).json(pizza);
  } catch (error) {
    console.error('Error adding pizza:', error);
    return res.status(500).json({ error: 'Failed to add pizza', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
