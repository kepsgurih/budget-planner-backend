import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash('P@ssw0rd', roundsOfHashing);

  const categories = await prisma.category.upsert({
    where: { name: 'Penggajian' },
    update: {},
    create: {
      name: 'Penggajian',
      maxAmount: 200000000,
    },
  });

  const category1 = await prisma.category.upsert({
    where: { name: 'Rumah' },
    update: {},
    create: {
      name: 'Rumah',
      maxAmount: 2000000,
    },
  });

  const category2 = await prisma.category.upsert({
    where: { name: 'Kebutuhan Dapur' },
    update: {},
    create: {
      name: 'Kebutuhan Dapur',
      maxAmount: 2000000,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'sample@email.com' },
    update: {},
    create: {
      email: 'sample@email.com',
      name: 'Sample User',
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'sample2@email.com' },
    update: {},
    create: {
      email: 'sample2@email.com',
      name: 'Sample User 2',
      password: passwordHash,
    },
  });

  await prisma.budget.upsert({
    where: { id: 1 },
    update: {},
    create: {
      description: 'Kontrakan',
      userId: user2.id,
      catId: category1.id,
      type: false,
      amount: 15000000,
      date: new Date(),
    },
  });

  await prisma.budget.upsert({
    where: { id: 2 },
    update: {},
    create: {
      description: 'Listrik',
      userId: user1.id,
      type: false,
      amount: 200000,
      catId: category1.id,
      date: new Date(),
    },
  });

  await prisma.budget.upsert({
    where: { id: 3 },
    update: {},
    create: {
      description: 'Air',
      userId: user1.id,
      type: false,
      amount: 30000,
      catId: category1.id,
      date: new Date(),
    },
  });
  await prisma.budget.upsert({
    where: { id: 4 },
    update: {},
    create: {
      description: 'Air',
      userId: user1.id,
      type: false,
      amount: 30000,
      catId: category1.id,
      date: new Date(),
    },
  });
  await prisma.budget.upsert({
    where: { id: 5 },
    update: {},
    create: {
      description: 'Popok Alina',
      userId: user1.id,
      type: false,
      amount: 100000,
      catId: category2.id,
      date: new Date(),
    },
  });
  await prisma.budget.upsert({
    where: { id: 6 },
    update: {},
    create: {
      description: 'Gaji',
      userId: user1.id,
      type: false,
      amount: 20000000,
      catId: categories.id,
      date: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
