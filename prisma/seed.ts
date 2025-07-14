import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const hash = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: {
      email: 'admin@email.com',
      password: hash,
    },
  });

  console.log('Admin criado com sucesso!');
}

main();
