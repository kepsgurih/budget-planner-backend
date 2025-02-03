import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert user
  const user1 = await prisma.user.upsert({
    where: { email: 'kevin@kevin.com' },
    update: {},
    create: {
      email: 'kevin@kevin.com',
      name: 'Kevin Krisma',
      password: 'P@ssw0rd',
    },
  });

  // Cek apakah budget sudah ada, jika tidak buat baru
  const budget1 = await prisma.budget.findUnique({ where: { id: 1 } });
  if (!budget1) {
    await prisma.budget.create({
      data: {
        id: 1,
        description: 'Prisma Adds Support for MongoDB',
        type: true,
        amount: '2000.00', // Decimal harus dalam bentuk string
        categories: 'new area',
        userId: user1.id,
      },
    });
  }

  const budget2 = await prisma.budget.findUnique({ where: { id: 2 } });
  if (!budget2) {
    await prisma.budget.create({
      data: {
        id: 2,
        description: "What's new in Prisma? (Q1/22)",
        type: false,
        amount: '1500.50',
        categories: 'updates',
        userId: user1.id,
      },
    });
  }

  console.log('Seeding selesai!');
}
main()
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error(e.message); // Pastikan hanya menampilkan pesan error
    } else {
      console.error('An unknown error occurred', e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

