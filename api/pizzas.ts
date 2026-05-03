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
