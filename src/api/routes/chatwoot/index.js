import { Router } from 'express';
import {
  assignToController,
  changeStatusController,
  chatwootWebhookController,
} from '../../controllers/index.js';
import { authHandler } from '../../middlewares/auth.handler.js';

const router = Router();

router.post('/', chatwootWebhookController);
router.put('/change-status', authHandler, changeStatusController);
router.post('/assign-to', authHandler, assignToController);

export default router;
