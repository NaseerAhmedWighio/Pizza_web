import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { status } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: id as string },
      data: { status }
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
}
