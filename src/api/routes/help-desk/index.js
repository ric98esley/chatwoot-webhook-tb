import { Router } from 'express';
import { createTicketController } from '../../controllers/index.js';

const router = Router();

router.post('/create-ticket', createTicketController);

export default router;
