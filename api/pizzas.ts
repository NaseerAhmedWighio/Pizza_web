import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pizzas = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(pizzas);
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    return res.status(500).json({ error: 'Failed to fetch pizzas', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
