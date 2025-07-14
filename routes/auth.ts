import { Router } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET = 'chave_secreta';

// Rota de login (já existia)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// ✅ NOVA ROTA: Cadastro de admin
router.post('/cadastro', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return res.status(409).json({ message: 'Email já cadastrado' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash },
    });

    return res.status(201).json({ message: 'Admin cadastrado com sucesso!', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar admin' });
  }
});

export default router;
