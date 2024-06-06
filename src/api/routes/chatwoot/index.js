import { Router } from 'express';
import {
  assignToController,
  changeStatusController,
  chatwootWebhookController,
} from '../../controllers/index.js';

const router = Router();

router.post('/', chatwootWebhookController);
router.put('/change-status', changeStatusController);
router.post('/assign-to', assignToController);

export default router;
