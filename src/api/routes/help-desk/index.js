import { Router } from 'express';
import { createTicketController } from '../../controllers/index.js';
import { authHandler } from '../../middlewares/auth.handler.js';

const router = Router();

router.post('/create-ticket', authHandler, createTicketController);

export default router;
