import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { randomUUID } from 'crypto';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  await prisma.product.deleteMany();

  for (const product of sampleData.products) {
    await prisma.product.create({
      data: { ...product, id: randomUUID() },
    });
  }

  console.log('Database seeded successfully');
}

main();