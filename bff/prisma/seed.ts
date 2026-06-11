import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEnv } from '../src/lib/envHelper';

const adapter = new PrismaPg({ connectionString: getEnv('DATABASE_URL')! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hash = await bcrypt.hash('admin', 10);

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'User',
      password: hash,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
