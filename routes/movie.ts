import { Router } from 'express';
import prisma from '../prisma/client';
import { verifyToken } from '../middlewares/auth';

const router = Router();

// Rota pública - listar filmes
router.get('/', async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
});

// Rota privada - criar filme
router.post('/', verifyToken, async (req, res) => {
  const { title, synopsis, trailer } = req.body;
  const movie = await prisma.movie.create({
    data: { title, synopsis, trailer }
  });
  res.json(movie);
});

export default router;
