// routes/admin.ts
import { Router } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Verifica se usuário já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  // Cria hash da senha
  const hash = await bcrypt.hash(password, 10);

  // Cria usuário no banco
  await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return res.status(201).json({ message: 'Admin criado com sucesso!' });
});

export default router;
