import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create products
  const pizzas = [
    // BEST PIZZAS (Rs 600 / 800)
    {
      name: 'De Pizza Town Sicilian',
      description: 'Chicken Fajita Marinated Meat with Onions, Green Pepper & jalapeno, Pizza Sauce Topped with Mozzarella Cheese.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800',
      category: 'Best Pizza'
    },
    {
      name: 'Chicken Fajita',
      description: 'Marinated Meat with Onions, Green Pepper, Pizza Sauce Topped with Mozzarella Cheese.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800',
      category: 'Best Pizza'
    },
    {
      name: 'Very Veggie',
      description: 'Black Olive, Tomatoes, Corns, Capsicum, Onions, Mushrooms, Pizza sauce Topped with Mozzarella Cheese.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800',
      category: 'Best Pizza'
    },
    {
      name: 'Margherita',
      description: 'Combination of Mozzarella Cheese with Pizza Sauce.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1576101223942-d77673e39035?auto=format&fit=crop&q=80&w=800',
      category: 'Best Pizza'
    },
    {
      name: 'Afghani Feast',
      description: 'Chicken Afghani Marinated Meat, 1000 Sauce, Mushroom and Topped with Mozzarella Cheese and Jalapenos.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=800',
      category: 'Best Pizza'
    },

    // OURS SPECIALS
    {
      name: 'Super Supreme',
      description: 'Chicken Marinated Meat, 1000 Sauce Jalapeno, Mushroom, Olives,capsicum onions oregano, Lots of Mozzarella Cheese.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1593504049359-74330189a355?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Afghani Mayo Garlic Creamy',
      description: 'Afghani Creamy Chicken Marinate, Dip Sauce, Mayo Garlic Sauce, Onion, capsicum Mushroom, Oregano, Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Afghani Creamy',
      description: 'Afghani Creamy Chicken Marinate, Dip Sauce, Onion, Oregano, Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Pepperoni Feast',
      description: 'Chicken Chunks of Pepperoni, Olive, Jalapeno, Mushrooms, Pizza Sauce Oregano, Lots of Mozzarella Cheese.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Creamy Tikka',
      description: 'Chicken Creamy Tikka Marinate with Meat, Mouth Watering Creamy Sauce, Onion Oregano, Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Malai Boti',
      description: 'Chicken Malai Marinate with meat, Dip Sauce, Onion, Mushrooms, Oregano. Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1585238342024-7833f5242279?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Hot BBQ',
      description: 'Chicken Hot BBQ Marinate, Onion, Red Chilli Pizza Sauce. Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },
    {
      name: 'Green Afghani',
      description: 'Green Afghani Creamy Chicken, Onion, Oregano, Dip Sauce, Lots of Mozzarella Cheese.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      category: 'Ours Specials'
    },

    // TOWN CLASSICS
    {
      name: 'De Pizza Town Shawarma',
      description: 'Chicken Shawarma Marinated Meat, Onions, Mushroom, Green Pepper, Jalapenos, 1000 Sauce, Topped with Mozzarella Cheese.',
      price: 800,
      image: 'https://images.unsplash.com/photo-1593504049359-74330189a355?auto=format&fit=crop&q=80&w=800',
      category: 'Town Classics'
    },
    {
      name: 'Chicken Tikka',
      description: 'Chicken Tikka Marinated Meat, Onions, Pizza Sauce, Topped with Mozzarella Cheese.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      category: 'Town Classics'
    },
    {
      name: 'Oliver Tikka',
      description: 'Chicken Marinated Meat, Black Olive. Pizza Sauce, Mushroom Oregano Topped with Mozzarella Cheese.',
      price: 600,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
      category: 'Town Classics'
    }
  ];

  for (const pizza of pizzas) {
    await prisma.product.create({ data: pizza });
  }

  // Create default settings
  await prisma.settings.upsert({
    where: { id: 'site-settings' },
    update: {},
    create: { id: 'site-settings' }
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
