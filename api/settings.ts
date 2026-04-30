import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '@/lib/db';

const defaultSettings = {
  id: 'site-settings',
  siteName: 'De Pizza Town',
  tagline: 'The taste of the century at your life',
  phone1: '+92 306 0022771',
  phone2: '+92 333 1399804',
  address: 'Block-B, North Nazimabad Town, Karachi, Pakistan',
  locationUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14470.97059885408!2d67.0426!3d24.9458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f114c000001%3A0xc3c5d6f83424683c!2sNorth%20Nazimabad%20Town!5e0!3m2!1sen!2spk!4v1714150000000!5m2!1sen!2spk',
  shopTiming: '3 PM – 3 AM',
  whatsapp: '923060022771',
  facebook: 'https://facebook.com/depizzatown',
  instagram: 'https://instagram.com/depizzatown9',
  tiktok: 'https://tiktok.com/@depizzatown9',
  description: 'Authentic taste, Karachi soul. Serving high-quality pizzas with premium ingredients since 2016.'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      let settings = await prisma.settings.findUnique({
        where: { id: 'site-settings' }
      });
      
      if (!settings) {
        settings = await prisma.settings.create({
          data: defaultSettings
        });
      }
      
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const settings = await prisma.settings.upsert({
        where: { id: 'site-settings' },
        update: data,
        create: { ...defaultSettings, ...data }
      });
      return res.status(200).json(settings);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
