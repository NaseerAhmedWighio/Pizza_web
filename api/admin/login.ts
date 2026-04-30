import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (email === 'admin@depizzatown.com' && password === 'admin123') {
    return res.status(200).json({ token: 'mock-jwt-token', user: { email } });
  }

  res.status(401).json({ error: 'Invalid credentials' });
}
