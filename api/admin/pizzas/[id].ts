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
  const { id } = req.query;
  const idStr = id as string;

  if (req.method === 'PUT') {
    const { name, description, price, image, category } = req.body;
    try {
      const pizza = await prisma.product.update({
        where: { id: idStr },
        data: { name, description, price, image, category }
      });
      return res.status(200).json(pizza);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update pizza' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.product.delete({ where: { id: idStr } });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete pizza' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
