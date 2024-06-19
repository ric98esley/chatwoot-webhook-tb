import { Router } from 'express';
import {
  addCustomToContactController,
  assignToController,
  changeStatusController,
  chatwootWebhookController,
} from '../../controllers/index.js';
import { authHandler } from '../../middlewares/auth.handler.js';

const router = Router();

router.post('/', chatwootWebhookController);
router.put('/change-status', authHandler, changeStatusController);
router.post('/assign-to', authHandler, assignToController);
router.post('/add-attributes', authHandler, addCustomToContactController);

export default router;
