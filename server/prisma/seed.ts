import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      name: 'John Doe'
    }
  });

  await prisma.invoice.createMany({
    data: [
      {
        description: 'Invoice #1',
        amount: 100,
        paid: false,
        due_date: new Date('2025-04-01'),
        vendor_name: 'Vendor A',
        user_id: user.id
      },
      {
        description: 'Invoice #2',
        amount: 200,
        paid: true,
        due_date: new Date('2025-05-01'),
        vendor_name: 'Vendor B',
        user_id: user.id
      },
      {
        description: 'Invoice #3',
        amount: 300,
        paid: false,
        due_date: new Date('2025-06-01'),
        vendor_name: 'Vendor C',
        user_id: user.id
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
