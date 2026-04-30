import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pizzas = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pizzas' });
  }
}
