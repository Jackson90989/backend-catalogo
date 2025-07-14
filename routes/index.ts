import { Router } from 'express';
import authRoutes from './auth'
import movieRoutes from './movie';
import adminRoutes from './admin';


const router = Router();
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/admin', adminRoutes);


export default router;
